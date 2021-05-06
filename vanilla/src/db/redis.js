const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const { PORT, HOST } = { ...REDIS_CONFIG }

// 创建redis客户端
const redisClient = redis.createClient(PORT, HOST)

// 监控error
redisClient.on('error', err => {
  console.log(err)
})

const setRedis = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  
  redisClient.set(key, val, redis.print)
}

const getRedis = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err)
        return
      }
      if (!value) {
        resolve(null)
        return
      }
      
      try {
        resolve(
          JSON.parse(value)
        )
      } catch (e) {
        reject(value)
      }
    })
  })
}

module.exports = {
  setRedis,
  getRedis
}