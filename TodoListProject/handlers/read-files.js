let fs = require('fs')
let url = require('url')

function getContentType (url) {
  let contentType = 'text/plain'
  if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (url.endsWith('.css')) {
    contentType = 'text/css'
  }

  return contentType
}

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname

  fs.readFile('.' + req.pathname, (err, data) => {
    // TODO: fix security issue, pls ;)
    // TODO: allow getting files only fron content folder
    if (err) {
      res.writeHead(404)
      res.write('404 Page Not Found')
      res.end()
      return true
    }

    let contentType = getContentType(req.pathname)

    res.writeHead(200, {
      'Content-Type': contentType
    })
    res.write(data)
    res.end()
  })
}

