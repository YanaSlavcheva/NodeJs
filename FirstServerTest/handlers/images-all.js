let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let imagesInfo = require('./../my-modules/images-info-container.js')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  var template = 'images-all.html'

  // var data = {images: [{name: 'Ryan Pays', url: 'http://www.ryanpays.com'}, {name: 'foo', url: 'http://www.google.com'}]}
  var data = {images: imagesInfo}

  if (req.pathname === '/images/all') {
    fs.readFile(template, function (err, template) {
      if (err) throw err

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      template = template.toString()
      res.write(mustache.to_html(template, data))
      res.end()
    })
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}