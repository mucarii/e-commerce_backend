const Usuario = require('../models/Usuario');

(async () => {
  const novoUsuario = {
    nome: 'Murilo Luiz Calore Ritto',
    email: 'muriloritto@alunos.edu.utfpr.br',
    senha: 'senha123',
    endereco: {
      rua: 'Rua Santos Dumont',
      cidade: 'Cornelio Procopio',
      estado: 'PR',
      cep: '86300-000'
    },
    telefone: '(99) 99999-9999',
  };

  const id = await Usuario.insert(novoUsuario);
  console.log('Usuário inserido com ID:', id);

  const usuarios = await Usuario.find();
  console.log('Usuários encontrados:', usuarios);

  const del = await Usuario.delete({ _id: id });
  console.log('Usuário deletado?', del?.deletedCount > 0);
})();
