const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
const logger = require('../logger');

class Pedido {
  /**
   * @param {{
   *   usuario_id: string,
   *   produtos: Array<{
   *     produto_id: string,
   *     quantidade: number,
   *     preco_unitario: number
   *   }>,
   *   endereco_entrega: string,
   *   forma_pagamento: string,
   *   status?: string
   * }} dados
   */
  constructor({ usuario_id, produtos, endereco_entrega, forma_pagamento, status }) {
    this.usuario_id = new ObjectId(usuario_id);
    this.produtos = produtos.map(p => ({
      produto_id: new ObjectId(p.produto_id),
      quantidade: p.quantidade,
      preco_unitario: p.preco_unitario
    }));
    this.endereco_entrega = endereco_entrega;
    this.forma_pagamento = forma_pagamento;
    // Se não passar status, fica “pendente”
    this.status = status || 'pendente';
    // Calcula valor_total somando (quantidade * preco_unitario) de cada item
    this.valor_total = this.produtos.reduce(
      (acc, item) => acc + item.quantidade * item.preco_unitario,
      0
    );
    this.data_pedido = new Date();
  }

  static collection() {
    return getDb().collection('pedidos');
  }

  /**
   * Insere um novo pedido.
   * @param {Pedido} pedidoInstancia
   * @returns {Promise<Object>} Documento inserido (com _id)
   */
  static async inserir(pedidoInstancia) {
    try {
      const result = await Pedido.collection().insertOne({
        usuario_id: pedidoInstancia.usuario_id,
        produtos: pedidoInstancia.produtos,
        endereco_entrega: pedidoInstancia.endereco_entrega,
        forma_pagamento: pedidoInstancia.forma_pagamento,
        status: pedidoInstancia.status,
        valor_total: pedidoInstancia.valor_total,
        data_pedido: pedidoInstancia.data_pedido
      });
      return result.ops[0];
    } catch (err) {
      logger.error('Erro ao inserir pedido:', err);
      throw err;
    }
  }

  /**
   * Lista pedidos (opcionalmente filtrando por usuário ou status).
   * @param {{ usuario_id?: string, status?: string }} filtro
   * @returns {Promise<Array>}
   */
  static async listar(filtro = {}) {
    try {
      const query = {};
      if (filtro.usuario_id) {
        query.usuario_id = new ObjectId(filtro.usuario_id);
      }
      if (filtro.status) {
        query.status = filtro.status;
      }
      return await Pedido.collection().find(query).toArray();
    } catch (err) {
      logger.error('Erro ao listar pedidos:', err);
      throw err;
    }
  }

  /**
   * Busca um pedido por _id.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  static async buscarPorId(id) {
    try {
      const _id = new ObjectId(id);
      return await Pedido.collection().findOne({ _id });
    } catch (err) {
      logger.error('Erro ao buscar pedido por ID:', err);
      throw err;
    }
  }

  /**
   * Atualiza apenas o status de um pedido.
   * @param {string} id
   * @param {string} novoStatus
   * @returns {Promise<boolean>}
   */
  static async atualizarStatus(id, novoStatus) {
    try {
      const _id = new ObjectId(id);
      const res = await Pedido.collection().updateOne(
        { _id },
        { $set: { status: novoStatus } }
      );
      return res.modifiedCount === 1;
    } catch (err) {
      logger.error('Erro ao atualizar status do pedido:', err);
      throw err;
    }
  }

  /**
   * Remove um pedido por _id.
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  static async removerPorId(id) {
    try {
      const _id = new ObjectId(id);
      const res = await Pedido.collection().deleteOne({ _id });
      return res.deletedCount === 1;
    } catch (err) {
      logger.error('Erro ao remover pedido:', err);
      throw err;
    }
  }
}

module.exports = Pedido;
