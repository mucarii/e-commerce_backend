const { connectDB } = require('../db/banco.js');
const fs = require('fs');

class Usuario {
  static async insert(usuario) {
    try {
      const db = await connectDB('ecommerce');
      const res = await db.collection('usuarios').insertOne({
        ...usuario,
        data_registro: new Date()
      });
      return res.insertedId;
    } catch (err) {
      Usuario.logError(err);
    }
  }

  static async find(query = {}) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('usuarios').find(query).toArray();
    } catch (err) {
      Usuario.logError(err);
    }
  }

  static async delete(query) {
    try {
      const db = await connectDB('ecommerce');
      return await db.collection('usuarios').deleteOne(query);
    } catch (err) {
      Usuario.logError(err);
    }
  }

  static logError(error) {
    fs.appendFileSync('./logs/error.log', `[${new Date().toISOString()}] ${error.stack}\n`);
  }
}

module.exports = Usuario;
