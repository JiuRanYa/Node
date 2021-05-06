const { query } = require('../db/mysql')

const login = async (username, password) => {
  const sql = `select username from users where username = ? and password = ?`
  
  console.log(sql)
  
  const result = await query(sql, [username, password])
  
  return result
}

const loginCheck = () => {

}

module.exports = {
  login
}