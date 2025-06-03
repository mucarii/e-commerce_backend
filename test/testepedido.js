const Pedido = require('../models/Pedido');

(async () => {
  const novoPedido = {
    usuario_id: 'ID_DO_USUARIO',
    produtos: [
      {
        produto_id: 'ID_DO_PRODUTO',
        quantidade: 2,
        preco_unitario: 199.99
      }
    ],
    endereco_entrega: {
      rua: 'Rua Santos Dumont',
      cidade: 'Cornelio Procopio',
      estado: 'PR',
      cep: '80000-000'
    },
    forma_pagamento: 'Cartão de Crédito'
  };

  const id = await Pedido.insert(novoPedido);
  console.log('Pedido inserido com ID:', id);

  const pedidos = await Pedido.find();
  console.log('Pedidos encontrados:', pedidos);

  const del = await Pedido.delete({ _id: id });
  console.log('Pedido deletado?', del?.deletedCount > 0);
})();
