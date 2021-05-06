const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    this.routeInfo = {
      all: [],
      get: [],
      post: [],
    }
  }
  
  register (path) {
    const info = {}
    
    if (typeof path === 'string') {
      info.path = path
      // get the remaining middleware from argument[1]
      info.stack = slice.call(arguments, 1)
      return info
    }
  
    // get the remaining middleware from argument[0]
    info.path = '/'
    info.stack = slice.call(arguments, 0)
    
    return info
  }
  
  use () {
    const info = this.register.apply(this, arguments)
    this.routeInfo.all.push(info)
  }
  
  get () {
    const info = this.register.apply(this, arguments)
    this.routeInfo.get.push(info)
  }
  
  post () {
    const info = this.register.apply(this, arguments)
    this.routeInfo.post.push(info)
  }
  
  // exec middleware function in stack
  handle (req, res, stack) {
    const next = () => {
      const firstMiddleware = stack.shift()
      
      if (firstMiddleware) {
        firstMiddleware(req, res, next)
      }
    }
    next()
  }
  
  // match middleware that accord with the method and the url (include accord with the parent route)
  match (url, method) {
    let stack = []
    
    if (url === '/favicon.ico') {
      return stack
    }
  
    // this array named all matched anything
    stack = stack.concat(this.routeInfo.all.flatMap(routeInfo => routeInfo.stack))
    
    // find middleware that matched the parent route
    const matchedRoute = this.routeInfo[method].filter(routeInfo => url.indexOf(routeInfo.path) === 0)
    stack = stack.concat(matchedRoute.flatMap(routeInfo => routeInfo.stack))
    return stack
  }
  
  callback () {
    return (req, res) => {
      // add the json method to the req
      req.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      
      const url = req.url
      const method = req.method.toLowerCase()
      
      // find all matched middleware
      const resultList = this.match(url, method)
      this.handle(req, res, resultList)
    }
  }
  
  // props drilling
  listen (...args) {
    const httpInstance = http.createServer(this.callback())
    httpInstance.listen(...args)
  }
}

// 工厂模式
module.exports = () => {
  return new LikeExpress()
}