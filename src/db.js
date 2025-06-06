const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ecommerce_db';

let client;
let db;

async function connect() {
  if (db) return db;
  client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

function getDb() {
  if (!db) {
    throw new Error('Banco de dados ainda não conectado. Chame connect() primeiro.');
  }
  return db;
}

async function close() {
  if (client) {
    await client.close();
    console.log('✕ Conexão com MongoDB encerrada');
  }
}

module.exports = { connect, getDb, close };
