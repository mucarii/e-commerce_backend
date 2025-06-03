const Avaliacao = require('../models/Avaliacao');

(async () => {
  const novaAvaliacao = {
    produto_id: 'ID_DO_PRODUTO',
    usuario_id: 'ID_DO_USUARIO',
    nota: 5,
    comentario: 'Mouse excelente para jogos!'
  };

  const id = await Avaliacao.insert(novaAvaliacao);
  console.log('Avaliação inserida com ID:', id);

  const avaliacoes = await Avaliacao.find();
  console.log('Avaliações encontradas:', avaliacoes);

  const del = await Avaliacao.delete({ _id: id });
  console.log('Avaliação deletada?', del?.deletedCount > 0);
})();
