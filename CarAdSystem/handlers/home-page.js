let fs = require('fs')
let url = require('url')

let mustache = require('./../node_modules/mustache/mustache')

let cars = require('./../my_modules/cars-container.js')
let headerModule = require('./../my_modules/header')
let stylesSection = require('./../my_modules/styles')
let scriptsSection = require('./../my_modules/scripts')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' || req.pathname === '/index') {
    if (req.method === 'GET') {
      let carsNotDeleted = cars.filter(function (obj) {
        return obj.isDeleted === false
      })

      carsNotDeleted.sort(function (a, b) {
        return new Date(a.price) - new Date(b.price)
      })

      let carsToDisplay = carsNotDeleted.slice(0, 6)

      let template = './views/index.html'
      let data = { cars: carsToDisplay }
      let partials = {header: headerModule, styles: stylesSection, scripts: scriptsSection}

      fs.readFile(template, function (err, template) {
        if (err) throw err

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        template = template.toString()
        res.write(mustache.to_html(template, data, partials))
        res.end()
      })
    }
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
