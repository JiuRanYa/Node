const redis = require('redis')

// 创建redis客户端
const redisClient = redis.createClient(6379, '127.0.0.1')

// 监控error
redisClient.on('error', err => {
  console.log(err)
})

// 测试
redisClient.set('myname', 'zhangsan2', redis.print)

redisClient.get('myname', (err, value) => {
  if (err) {
    console.log(err);
    return
  }
  
  console.log('val', value)
  
  // 退出
  redisClient.quit()
})