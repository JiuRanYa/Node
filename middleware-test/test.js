const express = require('./index')

// get instance
const app = express()

app.use((req, res, next) => {
  console.log('111')
  next()
})

app.use((req, res, next) => {
  console.log('222')
  next()
})

app.get('/user', (req, res, next) => {
  console.log('handle /user')
  next()
})

app.listen(3000, () => {
  console.log('port 3000 has been listened')
})