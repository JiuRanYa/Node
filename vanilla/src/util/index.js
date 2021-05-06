
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log(d.toUTCString())
  return d.toUTCString()
}

module.exports = {
  getCookieExpires
}