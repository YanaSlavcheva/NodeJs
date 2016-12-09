let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let imagesInfo = require('./../my-modules/blog-posts-info-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details')) {
    let template = 'blog-post-details.html'
    let splitPathname = req.pathname.split('/')
    let imageId = splitPathname[splitPathname.length - 1]

    var result = imagesInfo.filter(function (obj) {
      if (obj.id === parseInt(imageId)) {
        return obj
      }
    })

    if (result.length > 0) {
      let data = result[0]
      let partials = { header: headerModule, styles: stylesSection }

      console.log(data)
      console.log(template)

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
      res.writeHead(404)
      res.write('No such blog post')
      res.end()
    }
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
