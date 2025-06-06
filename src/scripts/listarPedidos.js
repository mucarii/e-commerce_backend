// node src/scripts/listarPedidos.js

const { connect, close } = require('../db');
const Pedido = require('../models/Pedido');
const logger = require('../logger');

async function listarPedidos() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (listarPedidos)');

    const pedidos = await Pedido.listar();
    const tabela = pedidos.map((p) => ({
      _id: p._id.toString(),
      usuario_id: p.usuario_id.toString(),
      valor_total: p.valor_total,
      status: p.status,
      data_pedido: p.data_pedido.toISOString(),
    }));
    console.table(tabela);
  } catch (err) {
    logger.error('✗ Erro em listarPedidos:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

listarPedidos();
