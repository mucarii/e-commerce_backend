const Categoria = require('../models/Categoria');

(async () => {
  const novaCategoria = {
    nome: 'Eletrônicos',
    descricao: 'Produtos eletrônicos em geral',
    subcategorias: ['Notebooks', 'Monitores', 'Celulares']
  };

  const id = await Categoria.insert(novaCategoria);
  console.log('Categoria inserida com ID:', id);

  const categorias = await Categoria.find();
  console.log('Categorias encontradas:', categorias);

  const del = await Categoria.delete({ _id: id });
  console.log('Categoria deletada?', del?.deletedCount > 0);
})();
