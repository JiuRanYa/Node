const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])
  
  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')
  
  // handle post
  if (req.method === 'POST') {
    console.log('req content-type', req.headers['content-type'])
    
    let postData = ''
    
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    
    req.on('end', () => {
      console.log(postData)
      res.end('hello word')
    })
  }
})

server.listen(3000)
