//node src/scripts/listarProdutos.js


const { connect, close } = require('../db');
const Produto = require('../models/Produto');
const logger = require('../logger');

async function listarProdutos() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (listarProdutos)');

    const produtos = await Produto.listar();
    console.table(produtos);
  } catch (err) {
    logger.error('✗ Erro em listarProdutos:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

listarProdutos();
