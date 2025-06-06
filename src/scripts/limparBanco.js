// node src/scripts/limparBanco.js

const { connect, getDb, close } = require('../db');
const logger = require('../logger');

async function main() {
  try {
    // 1) Conecta ao banco
    await connect();
    logger.info('✔ Conectado ao MongoDB para limpeza do banco.');

    const db = getDb();

    // 2) Nome das coleções que queremos esvaziar
    const colecoes = ['usuarios', 'produtos', 'pedidos'];

    for (const nomeColecao of colecoes) {
      // Checa se a coleção existe para evitar erro
      const collectionsInfo = await db.listCollections({ name: nomeColecao }).toArray();
      if (collectionsInfo.length === 0) {
        logger.warn(`Coleção "${nomeColecao}" não existe. Pulando.`);
        continue;
      }

      // Deleta todos os documentos dessa coleção
      const result = await db.collection(nomeColecao).deleteMany({});
      logger.info(`Coleção "${nomeColecao}" limpa. ${result.deletedCount} documento(s) removido(s).`);
    }

    logger.info('✓ Limpeza do banco concluída.');
  } catch (err) {
    logger.error('✗ Erro ao limpar o banco de dados:', err);
  } finally {
    // 3) Fecha conexão e encerra
    await close();
    process.exit(0);
  }
}

main();
