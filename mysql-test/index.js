const mysql = require('mysql')

const config = {
  host:'localhost',
  user: 'root',
  password: 'tsy210258',
  port: '3306',
  database: 'blog'
}

const connect = mysql.createConnection(config)

connect.connect()

const sql = `insert users (username, password) values ('tts', '2123')`

connect.query(sql, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(res)
})

connect.end()

