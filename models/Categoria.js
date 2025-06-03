const { connectDB } = require('../db/mongoClient');
const fs = require('fs');

class Categoria {
  static async insert(categoria) {
    try {
      const db = await connectDB('ecommerce');
      const res = await db.collection('categorias').insertOne(categoria);
      return res.insertedId;
    } catch (err) {
      Categoria.logError(err);
    }
  }

  static async find(query = {}) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('categorias').find(query).toArray();
    } catch (err) {
      Categoria.logError(err);
    }
  }

  static async delete(query) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('categorias').deleteOne(query);
    } catch (err) {
      Categoria.logError(err);
    }
  }

  static logError(err) {
    fs.appendFileSync('./logs/error.log', `[${new Date().toISOString()}] ${err.stack}\n`);
  }
}

module.exports = Categoria;
