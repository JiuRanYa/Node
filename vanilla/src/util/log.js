const fs = require('fs')
const path = require('path')

// 创建 write stream
function createWriteSteam (fileName) {
  const fullFileName = path.join(__dirname, '../', 'logs', fileName)
  
  return fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
}

// 写日志
function writeLog (writeStream, log) {
  writeStream.write(log + '\r\n')
}

// access 访问日志
const accessSteam = createWriteSteam('access.log')

function access(log) {
  writeLog(accessSteam, log)
}

module.exports = {
  access
}
