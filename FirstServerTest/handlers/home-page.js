let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/') {
    fs.readFile('./index.html', (err, data) => {
          // TODO: manage the err as proper res
      if (err) console.log(err)
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
