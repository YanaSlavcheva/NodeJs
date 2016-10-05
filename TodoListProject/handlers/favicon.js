let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  let parsedUrl = req.pathname || url.parse(req.url).pathname

  if (parsedUrl === '/favicon.ico') {
    fs.readFile('./favicon.ico', (err, data) => {
        // TODO: manage the err as proper res
      if (err) console.log(err)
      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
