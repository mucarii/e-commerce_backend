const { connectDB } = require('../db/mongoClient');
const fs = require('fs');

class Pedido {
  static async insert(pedido) {
    try {
      const db = await connectDB('ecommerce');
      pedido.data_pedido = new Date();
      const res = await db.collection('pedidos').insertOne(pedido);
      return res.insertedId;
    } catch (err) {
      Pedido.logError(err);
    }
  }

  static async find(query = {}) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('pedidos').find(query).toArray();
    } catch (err) {
      Pedido.logError(err);
    }
  }

  static async delete(query) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('pedidos').deleteOne(query);
    } catch (err) {
      Pedido.logError(err);
    }
  }

  static logError(err) {
    fs.appendFileSync('./logs/error.log', `[${new Date().toISOString()}] ${err.stack}\n`);
  }
}

module.exports = Pedido;
