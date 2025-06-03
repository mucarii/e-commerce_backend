const { connectDB } = require('../db/mongoClient');
const fs = require('fs');

class Avaliacao {
  static async insert(avaliacao) {
    try {
      const db = await connectDB('ecommerce');
      const res = await db.collection('avaliacoes').insertOne(avaliacao);
      return res.insertedId;
    } catch (err) {
      Avaliacao.logError(err);
    }
  }

  static async find(query = {}) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('avaliacoes').find(query).toArray();
    } catch (err) {
      Avaliacao.logError(err);
    }
  }

  static async delete(query) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('avaliacoes').deleteOne(query);
    } catch (err) {
      Avaliacao.logError(err);
    }
  }

  static logError(err) {
    fs.appendFileSync('./logs/error.log', `[${new Date().toISOString()}] ${err.stack}\n`);
  }
}

module.exports = Avaliacao;
