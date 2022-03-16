const { database } = require('./config');
const mysql = require('mysql');

// Crear la conexion
const connection = mysql.createPool(database);
   
// Conectamos a la base de datos
connection.createPool();

module.exports = connection;