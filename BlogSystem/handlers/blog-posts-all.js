let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let imagesInfo = require('./../my-modules/blog-posts-info-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  let template = 'blog-posts-all.html'
  let data = { images: imagesInfo }
  let partials = { header: headerModule, styles: stylesSection }

  if (req.pathname === '/all') {
    fs.readFile(template, function (err, template) {
      if (err) throw err

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      template = template.toString()
      res.write(mustache.to_html(template, data, partials))
      res.end()
    })
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
