const { MongoClient } = require('mongodb');
const Banco = MongoClient;

const uri = 'mongodb://localhost:27017';
const client = new Banco(uri);

async function connectDB(dbName) {
  try {
    await client.connect();
    console.log('🟢 Conectado ao MongoDB');
    return client.db(dbName);
  } catch (err) {
    logError(err);
    throw err;
  }
}

function logError(error) {
  const fs = require('fs');
  fs.appendFileSync('./logs/error.log', `[${new Date().toISOString()}] ${error.stack}\n`);
}

module.exports = { connectDB };
