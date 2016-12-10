let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let cars = require('./../my-modules/cars-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  let carsNotDeleted = cars.filter(function (obj) {
    return obj.isDeleted === false
  })

  carsNotDeleted.sort(function (a, b) {
    return new Date(a.createdOn) - new Date(b.createdOn)
  })

  let carsToDisplay = carsNotDeleted.slice(0, 6)

  let template = 'cars-all.html'
  let data = { cars: carsToDisplay }
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
