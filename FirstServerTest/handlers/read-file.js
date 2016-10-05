let fs = require('fs')
let url = require('url')

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname

  fs.readFile('.' + req.pathname, (err, data) => {
        // TODO: fix security issue, pls ;)
        // TODO: allow getting files only from content folder
    if (err) {
      res.writeHead(404)
      res.write('404 Page Not Found')
      res.end()

      return
    }

    let contentType = 'text/plain'
    if (req.pathname.endsWith('.css')) {
      contentType = 'text/css'
    } else if (req.pathname.endsWith('.js')) {
      contentType = 'application/javascript'
    }

    res.writeHead(200, {
      'Content-Type': contentType
    })
    res.write(data)
    res.end()
  })
}
