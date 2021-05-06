const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { getCookieExpires } = require('./src/util/index')
const { access } = require('./src/util/log')

// 处理 Post Data
const getPostData = (req) => {
  return new Promise((resolve, reject)  => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
  
    // if not JSON
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    
    let postData = ''
    
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
    
  })
}

const handleCookieStr = (cookieStr) => {
  const result = {}
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const [key, value] = item.split('=').map(item => item.trim())
  
    result[key] = value
  })
  
  return result
}

// session 数据
const SESSION_DATA= {}

const serverHandle = async (req, res) => {
  // 书写访问日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}}`)
  
  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')
  
  // 给req附值path属性
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])
  
  // 解析cookie
  const cookieStr = req.headers.cookie || ''
  req.cookie = handleCookieStr(cookieStr)
  
  
  // 解析 session
  let userId = req.cookie.userId
  let needSetCookie = false
  
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  req.sessionId = userId
  
  
  // 处理 post data
  getPostData(req).then(async (postData) => {
    req.body = postData
  
    // 处理 blog 路由
    const blogData = await handleBlogRouter(req, res)
  
    if (blogData) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
      }
      res.end(
        JSON.stringify(blogData)
      )
      return
    }
  
    // 处理 user 路由
    const userData = await handleUserRouter(req, res).catch(err => console.log(err))
  
    if (userData) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
      }
      res.end(
        JSON.stringify(userData)
      )
      return
    }
  
    // 未命中
    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    res.write('404 Not Found')
    res.end()
  })

}


module.exports = serverHandle