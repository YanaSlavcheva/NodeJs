let url = require('url')
let fs = require('fs')

let mustache = require('./../node_modules/mustache/mustache')

let cars = require('./../my-modules/cars-container.js')
let comments = require('./../my-modules/comments-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/stats') {
    let data = { cars: cars }
    data.cars.forEach(function (car) {
      let commentsForCar = comments.filter(function (obj) {
        return obj.carId === car.id
      })

      car.commentsCount = commentsForCar.length
    })

    let template = 'stats.html'
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
