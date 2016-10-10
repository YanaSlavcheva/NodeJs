let url = require('url')
let mustache = require('./../node_modules/mustache/mustache')
let fs = require('fs')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  var itemToDisplay = []
  itemToDisplay.push({
    path: './',
    template: 'images-all.html',
    view: {
      name: 'test image name',
      url: 'www.testimageurl'
    }
  })

  var data = {images: [{name: 'Ryan Pays', url: 'http://www.ryanpays.com'}, {name: 'foo', url: 'http://www.google.com'}]}

  if (req.pathname === '/images/all') {
    fs.readFile(itemToDisplay[0].template, function (err, template) {
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
