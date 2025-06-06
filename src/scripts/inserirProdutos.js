// src/scripts/inserirProdutos.js

const { connect, close } = require('../db');
const Produto = require('../models/Produto');
const logger = require('../logger');

async function inserirProdutos() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (inserirProdutos)');

    // Defina aqui os produtos que quer inserir:
    const p1 = new Produto({
      nome: 'Mouse Gamer',
      descricao: 'Mouse com DPI ajustável e iluminação RGB',
      preco: 150.0,
      estoque: 25,
    });
    const p2 = new Produto({
      nome: 'Teclado Mecânico',
      descricao: 'Teclado mecânico azul, com switches lineares',
      preco: 300.0,
      estoque: 10,
    });

    const prod1 = await Produto.inserir(p1);
    const prod2 = await Produto.inserir(p2);

    logger.info(
      'Produtos inseridos:',
      prod1._id.toString(),
      prod2._id.toString()
    );
  } catch (err) {
    logger.error('✗ Erro em inserirProdutos:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

inserirProdutos();
