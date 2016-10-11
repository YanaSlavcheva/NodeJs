let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let imagesInfo = require('./../my-modules/images-info-container.js')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/images/details')) {
    let template = 'image-details.html'
    let splitPathname = req.pathname.split('/')
    let imageId = splitPathname[splitPathname.length - 1]

    var result = imagesInfo.filter(function (obj) {
      if (obj.id === parseInt(imageId)) {
        return obj
      }
    })

    if (result.length > 0) {
      let data = result[0]
      console.log(data)
      console.log(template)

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
      res.writeHead(404)
      res.write('No such image')
      res.end()
    }
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
