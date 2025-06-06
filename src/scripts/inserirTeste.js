const { connect, getDb, close } = require('../db');
const Produto = require('../models/Produto');
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');
const logger = require('../logger');

async function main() {
  try {
    // 1) Conecta ao banco
    await connect();
    logger.info('✔ Conectado ao MongoDB');

    // 2) Limpa coleções (opcional, para rodar múltiplas vezes sem duplicar)
    // await getDb().collection('usuarios').deleteMany({});
    // await getDb().collection('produtos').deleteMany({});
    // await getDb().collection('pedidos').deleteMany({});

    // 3) Inserir Usuários
    logger.info('→ Inserindo usuários...');
    const u1 = new Usuario({
      nome: 'Alice Silva',
      email: 'alice@gmail.com',
      senha: 'senha123',
      telefone: '(41) 90000-1111'
    });
    const u2 = new Usuario({
      nome: 'Bruno Oliveira',
      email: 'bruno@gmail.com',
      senha: 'minhaSenha!',
      telefone: '(41) 98888-2222'
    });
    const usuario1 = await Usuario.inserir(u1);
    const usuario2 = await Usuario.inserir(u2);
    logger.info('Usuários inseridos:', usuario1._id.toString(), usuario2._id.toString());

    // 4) Inserir Produtos
    logger.info('→ Inserindo produtos...');
    const p1 = new Produto({
      nome: 'Mouse Gamer',
      descricao: 'Mouse com DPI ajustável e iluminação RGB',
      preco: 150.0,
      estoque: 25
    });
    const p2 = new Produto({
      nome: 'Teclado Mecânico',
      descricao: 'Teclado mecânico azul, com switches lineares',
      preco: 300.0,
      estoque: 10
    });
    const prod1 = await Produto.inserir(p1);
    const prod2 = await Produto.inserir(p2);
    logger.info('Produtos inseridos:', prod1._id.toString(), prod2._id.toString());

    // 5) Inserir Pedido
    logger.info('→ Inserindo pedido...');
    const pedido1 = new Pedido({
      usuario_id: usuario1._id.toString(),
      produtos: [
        { produto_id: prod1._id.toString(), quantidade: 2, preco_unitario: prod1.preco },
        { produto_id: prod2._id.toString(), quantidade: 1, preco_unitario: prod2.preco }
      ],
      endereco_entrega: 'Rua das Flores, 123, Curitiba - PR',
      forma_pagamento: 'Cartão de Crédito'
      // status deixamos o padrão 'pendente'
    });
    const pInserido = await Pedido.inserir(pedido1);
    logger.info(
      'Pedido inserido:',
      pInserido._id.toString(),
      '| Valor total:',
      pInserido.valor_total
    );

    // 6) Listar tudo para ver se ficou correto
    logger.info('\n→ Listagem de Usuários:');
    const usuarios = await Usuario.listar();
    console.table(usuarios);

    logger.info('\n→ Listagem de Produtos:');
    const produtos = await Produto.listar();
    console.table(produtos);

    logger.info('\n→ Listagem de Pedidos:');
    const pedidos = await Pedido.listar();
    console.table(
      pedidos.map(p => ({
        _id: p._id.toString(),
        usuario_id: p.usuario_id.toString(),
        valor_total: p.valor_total,
        status: p.status,
        data_pedido: p.data_pedido.toISOString()
      }))
    );

    logger.info('\n✓ Script de teste finalizado com sucesso.');
  } catch (err) {
    logger.error('✗ Erro no inserirTeste.js:', err);
  } finally {
    // 7) Fecha conexão e sai
    await close();
    process.exit(0);
  }
}

main();
