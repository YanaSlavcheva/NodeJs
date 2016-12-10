let fs = require('fs')
let url = require('url')

function checkIfFileExtensionIsAllowed (req) {
  let isFileExtensionAllowed = false
  let allowedFileExtensions = [
    '.css',
    '.js',
    '.html',
    '.jpg',
    '.png',
    '.jpeg'
  ]

  for (let fileExtension of allowedFileExtensions) {
    if (req.pathname.endsWith(fileExtension)) {
      isFileExtensionAllowed = true
    }
  }

  return isFileExtensionAllowed
}

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname

  fs.readFile('.' + req.pathname, (err, data) => {
    let isFileFolderAllowed = req.pathname.startsWith('/content')
    let isFileExtensionAllowed = checkIfFileExtensionIsAllowed(req)

    if (err || !isFileFolderAllowed || !isFileExtensionAllowed) {
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
    } else if (req.pathname.endsWith('.jpg')) {
      contentType = 'image/jpeg'
    } else if (req.pathname.endsWith('.jpeg')) {
      contentType = 'image/jpeg'
    } else if (req.pathname.endsWith('.png')) {
      contentType = 'image/png'
    } else if (req.pathname.endsWith('.html')) {
      contentType = 'text/html'
    }

    res.writeHead(200, {
      'Content-Type': contentType
    })
    res.write(data)
    res.end()
  })
}
