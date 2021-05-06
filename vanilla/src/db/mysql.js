const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

let pool = mysql.createPool(MYSQL_CONFIG);

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, values, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })
      connection.release()
    })
  })
};

module.exports = {
  query
};