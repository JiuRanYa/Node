const http = require('http')
const serverHandle = require('../app')

const PORT = 8000

try {
  const server = http.createServer(serverHandle)
  
  server.listen(PORT)
} catch (e) {
  console.log(e);
}

