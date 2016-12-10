let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = url.parse(req.url).pathname

  if (req.pathname === '/favicon.ico') {
    fs.readFile('./favicon.ico', (err, data) => {
      if (err) console.log(err)
      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
