// process.stdin.pipe(process.stdout)

// 复制文件

const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data.bak.txt')

const readStream = fs.createReadStream(fileName1)
const writeSteam = fs.createWriteStream(fileName2)

readStream.pipe(writeSteam)

readStream.on('end', () => {
  console.log('copy down')
})
