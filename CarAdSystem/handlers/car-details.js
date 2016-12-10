let url = require('url')
let fs = require('fs')
let qs = require('querystring')

let mustache = require('./../node_modules/mustache/mustache')

let cars = require('./../my_modules/cars-container.js')
let comments = require('./../my_modules/comments-container.js')
let headerModule = require('./../my_modules/header')
let stylesSection = require('./../my_modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details') && !req.pathname.endsWith('/comment')) {
    if (req.method === 'GET') {
      let template = './views/car-details.html'
      let splitPathname = req.pathname.split('/')
      let carId = splitPathname[splitPathname.length - 1]

      var result = cars.filter(function (obj) {
        if (obj.id === parseInt(carId)) {
          return obj
        }
      })

      if (result.length > 0) {
        let car = result[0]
        car.views = car.views + 1

        console.log(comments)

        let commentsForCar = comments.filter(function (obj) {
          return obj.carId === car.id
        })

        let data = car
        data.comments = commentsForCar

        if (car.isDeleted === true) {
          data.deleteButtonText = 'Undelete'
        } else {
          data.deleteButtonText = 'Delete'
        }

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
        res.write('No such car')
        res.end()
      }
    } else if (req.method === 'POST') {
      let body = ''

      req.on('data', (data) => {
        body += data

        if (body.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        let postData = qs.parse(body)

        if (!postData['id']) {
          res.writeHead(200, {
            Status: 'WARNING',
            Code: 'WARNING-CODE'
          })
          res.write('Sorry, cannot delete car now. Try again later.')
          res.end()
        } else {
          let carId = parseInt(postData['id'])
          let currentCar = cars.filter(function (obj) {
            return obj.id === carId
          })

          if (currentCar) {
            if (currentCar[0].isDeleted === true) {
              currentCar[0].isDeleted = false
            } else {
              currentCar[0].isDeleted = true
            }
          }

          console.log(currentCar[0])

          res.writeHead(302, {
            'Location': '/details/' + currentCar[0].id
          })
          res.end()
        }
      })
    }
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
