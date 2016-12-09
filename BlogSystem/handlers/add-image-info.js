let url = require('url')
let fs = require('fs')
let qs = require('querystring')

let mustache = require('./../node_modules/mustache/mustache')

let imagesInfo = require('./../my-modules/images-info-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/images/add') {
    if (req.method === 'GET') {
      let template = './add-image.html'
      let data = []
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

        if (!postData['name'] || !postData['url']) {
          res.writeHead(200, {
            Status: 'WARNING',
            Code: 'WARNING-CODE'
          })
          res.write('Please, fill some data first')
          res.end()
        } else {
          let template = './image-added.html'
          let data = []
          let partials = { header: headerModule, styles: stylesSection }

          var numberOfImagesSavedByNow = Object.keys(imagesInfo).length

          let myImageInfo = ({
            id: numberOfImagesSavedByNow + 1,
            name: postData['name'],
            url: postData['url']
          })

          imagesInfo.push(myImageInfo)

          data = myImageInfo
          console.log(imagesInfo)

          // TODO: redirect or show some proper html
          // res.writeHead(200)
          // res.write('Image info added successfully')
          // res.end()
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
      })
    }
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
