const Produto = require('../models/Produto');

(async () => {
  const novoProduto = {
    nome: 'Mouse Gamer',
    descricao: 'Mouse com sensor óptico e luz RGB',
    preco: 199.99,
    quantidade_estoque: 30,
    categoria: 'Periféricos',
    marca: 'Reddragon',
    imagens: ['https://patoloco.com.br/arquivos/produtos/imagens_adicionais/fe79fb70742cbdfa53a60e12dc1b43b14d31b2d9.jpeg']
  };

  const id = await Produto.insert(novoProduto);
  console.log('Produto inserido com ID:', id);

  const produtos = await Produto.find();
  console.log('Produtos encontrados:', produtos);

  const del = await Produto.delete({ _id: id });
  console.log('Produto deletado?', del?.deletedCount > 0);
})();
