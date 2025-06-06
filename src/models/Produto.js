const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
const logger = require('../logger');

class Produto {
  /**
   * @param {{
   *   nome: string,
   *   descricao?: string,
   *   preco: number,
   *   estoque: number
   * }} dados
   */
  constructor({ nome, descricao, preco, estoque }) {
    this.nome = nome;
    this.descricao = descricao || '';
    this.preco = preco;
    this.estoque = estoque;
    this.data_criacao = new Date();
  }

  static collection() {
    return getDb().collection('produtos');
  }

  /**
   * Insere um novo produto.
   * @param {Produto} produtoInstancia
   * @returns {Promise<Object>} Documento inserido (com _id)
   */
  static async inserir(produtoInstancia) {
    try {
      const result = await Produto.collection().insertOne({
        nome: produtoInstancia.nome,
        descricao: produtoInstancia.descricao,
        preco: produtoInstancia.preco,
        estoque: produtoInstancia.estoque,
        data_criacao: produtoInstancia.data_criacao
      });
      return result.ops[0];
    } catch (err) {
      logger.error('Erro ao inserir produto:', err);
      throw err;
    }
  }

  /**
   * Lista produtos (pode passar filtro simples).
   * @param {{}} filtro
   * @returns {Promise<Array>}
   */
  static async listar(filtro = {}) {
    try {
      return await Produto.collection().find(filtro).toArray();
    } catch (err) {
      logger.error('Erro ao listar produtos:', err);
      throw err;
    }
  }

  /**
   * Busca um produto por _id.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  static async buscarPorId(id) {
    try {
      const _id = new ObjectId(id);
      return await Produto.collection().findOne({ _id });
    } catch (err) {
      logger.error('Erro ao buscar produto por ID:', err);
      throw err;
    }
  }

  /**
   * Atualiza um produto por _id.
   * @param {string} id
   * @param {{ nome?: string, descricao?: string, preco?: number, estoque?: number }} dadosAtualizados
   * @returns {Promise<boolean>}
   */
  static async atualizarPorId(id, dadosAtualizados) {
    try {
      const _id = new ObjectId(id);
      const updateObj = {};
      if (dadosAtualizados.nome !== undefined) {
        updateObj.nome = dadosAtualizados.nome;
      }
      if (dadosAtualizados.descricao !== undefined) {
        updateObj.descricao = dadosAtualizados.descricao;
      }
      if (dadosAtualizados.preco !== undefined) {
        updateObj.preco = dadosAtualizados.preco;
      }
      if (dadosAtualizados.estoque !== undefined) {
        updateObj.estoque = dadosAtualizados.estoque;
      }
      const res = await Produto.collection().updateOne(
        { _id },
        { $set: updateObj }
      );
      return res.modifiedCount === 1;
    } catch (err) {
      logger.error('Erro ao atualizar produto:', err);
      throw err;
    }
  }

  /**
   * Remove um produto por _id.
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  static async removerPorId(id) {
    try {
      const _id = new ObjectId(id);
      const res = await Produto.collection().deleteOne({ _id });
      return res.deletedCount === 1;
    } catch (err) {
      logger.error('Erro ao remover produto:', err);
      throw err;
    }
  }
}

module.exports = Produto;
