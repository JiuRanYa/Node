const { query } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where author = ? and keyword = ?`
  
  if (author && !keyword) {
    sql = `select * from blogs where author = ?`
    return query(sql, [author])
  }
  
  if (keyword && !author) {
    sql = `select * from blogs where keyword = ?`
    return query(sql, [keyword])
  }
  
  return query(sql, [author, keyword])
}

const getDetail = (id) => {
  const sql = `select * from blogs where id = ?`
  
  return query(sql, [id])
}

const newBlog = async (blogData = {}) => {
  const { title, keyword, author} = blogData
  const sql = `insert blogs (title,keyword,author) values (?, ? ,?)`
  
  const data = await query(sql, [title, keyword, author])
  
  return {
    id: data.insertId
  }
}

const updateBlog = async (blogId, blogData = {}) => {
  if (!blogId) {
    return false
  }
  
  const { title, keyword, author} = blogData
  const sql = `update blogs set title = ?, keyword = ?, author = ? where id = ?`
  
  const result = await query(sql, [title, keyword, author, blogId])
  
  if (result.affectedRows) {
    return true
  }
  return false
}

const deleteBlog = async (blogId, author) => {
  const sql = `delete from blogs where id = ? and author = ?`
  
  const result = await query(sql, [blogId, author])
  
  if (result.affectedRows) {
    return true
  }
  
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}