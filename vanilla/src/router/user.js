const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getCookieExpires } = require('../util/index')
const { setRedis, getRedis } = require('../db/redis')


const getMaxAge = () => {
  const d = new Date()
  d.setTime(24 * 60 * 60 * 1000)
  return d.toTimeString()
}

const handleUserRouter = async (req, res) => {
  const method = req.method
  
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = await login(username, password)
  
    if (result.length) {
      req.session.username = result[0].username
  
      // 同步到redis
      setRedis(req.sessionId, req.session)
  
      return new SuccessModel(result[0],"登陆成功")
    }
  
    return new ErrorModel("登陆失败, 账号或者密码错误")
  }
  
  // 登录验证
  if (method === 'GET' && req.path === '/api/user/loginCheck') {
    const userInfo = await getRedis(req.sessionId)
    if (userInfo.username) {
      return new SuccessModel({
        userInfo: userInfo
      }, '已经登录')
    }
    
    return new ErrorModel('尚未登录')
  }
}

module.exports = handleUserRouter