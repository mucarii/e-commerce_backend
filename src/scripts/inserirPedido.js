// node src/scripts/inserirPedido.js <usuarioId> <prod1Id> 2 150 <prod2Id> 1 300
// node src/scripts/inserirPedido.js 60faa1abc123def456 60faa3abc123def456 2 150 60faa4abc123def456 1 300


const { connect, close } = require('../db');
const Pedido = require('../models/Pedido');
const logger = require('../logger');

async function inserirPedido() {
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.error('Uso: node inserirPedido.js <usuarioId> <prod1Id> <qtd1> <preco1> [<prod2Id> <qtd2> <preco2> ...]');
    process.exit(1);
  }

  // Monta o array de produtos dinamicamente, lendo os args
  const usuarioId = args[0];
  const produtosArg = args.slice(1); // resto dos argumentos
  const produtos = [];

  for (let i = 0; i < produtosArg.length; i += 3) {
    const produto_id = produtosArg[i];
    const quantidade = Number(produtosArg[i + 1]);
    const preco_unitario = Number(produtosArg[i + 2]);
    produtos.push({ produto_id, quantidade, preco_unitario });
  }

  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (inserirPedido)');

    const pedido = new Pedido({
      usuario_id: usuarioId,
      produtos,
      endereco_entrega: 'Rua Santos Dumont, 123, Cornélio Procópio, PR',
      forma_pagamento: 'Cartão de Crédito',
    });

    const pInserido = await Pedido.inserir(pedido);
    logger.info(
      'Pedido inserido:',
      pInserido._id.toString(),
      '| Valor total:',
      pInserido.valor_total
    );
  } catch (err) {
    logger.error('✗ Erro em inserirPedido:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

inserirPedido();
