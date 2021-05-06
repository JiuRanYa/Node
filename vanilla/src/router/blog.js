const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')

const handleBlogRouter = async (req, res) => {
  const method = req.method
  const id = req.query.id
  
  // 博客列表接口
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = await getList(author, keyword)
    return new SuccessModel(listData, '博客列表接口')
  }
  
  // 博客详情接口
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const detail = await getDetail(id)
    
    return new SuccessModel(detail)
  }
  
  // 博客新建接口
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogId = await newBlog(req.body)
  
    return new SuccessModel(blogId)
  }
  
  // 博客更新接口
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = await updateBlog(req.body?.id, req.body)
    
    if (result) {
      return new SuccessModel("更新博客成功")
    }
  
    return new ErrorModel("更新博客失败")
  }
  
  // 博客删除接口
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = await deleteBlog(req.body?.id, req.body?.author)
    
    if (result) {
      return new SuccessModel("删除博客成功")
    }
  
    return new ErrorModel("删除博客失败")
  }
}

module.exports = handleBlogRouter