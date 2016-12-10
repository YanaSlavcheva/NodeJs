let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let cars = require('./../my_modules/cars-container.js')
let headerModule = require('./../my_modules/header')
let stylesSection = require('./../my_modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/all') {
    let carsNotDeleted = cars.filter(function (obj) {
      return obj.isDeleted === false
    })

    carsNotDeleted.sort(function (a, b) {
      return new Date(a.createdOn) - new Date(b.createdOn)
    })

    let template = './views/cars-all.html'
    let data = { cars: carsNotDeleted }
    let partials = { header: headerModule, styles: stylesSection }

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
