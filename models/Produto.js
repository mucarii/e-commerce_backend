const { connectDB } = require('../db/mongoClient');

class Produto {
  static async insert(produto) {
    try {
      const db = await connectDB('ecommerce');
      const res = await db.collection('produtos').insertOne(produto);
      return res.insertedId;
    } catch (err) {
      Produto.logError(err);
    }
  }

  static async find(query = {}) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('produtos').find(query).toArray();
    } catch (err) {
      Produto.logError(err);
    }
  }

  static async delete(query) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('produtos').deleteOne(query);
    } catch (err) {
      Produto.logError(err);
    }
  }

  static logError(error) {
    const fs = require('fs');
    fs.appendFileSync('./logs/error.log', `[${new Date().toISOString()}] ${error.stack}\n`);
  }
}

module.exports = Produto;
