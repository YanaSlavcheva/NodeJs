let url = require('url')
let fs = require('fs')
let qs = require('querystring')

let mustache = require('./../node_modules/mustache/mustache')

let comments = require('./../my_modules/comments-container.js')
let headerModule = require('./../my_modules/header')
let stylesSection = require('./../my_modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details') && req.pathname.endsWith('/comment')) {
    if (req.method === 'POST') {
      let body = ''

      req.on('data', (data) => {
        body += data

        if (body.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        let postData = qs.parse(body)

        if (!postData['username'] || !postData['commentText']) {
          res.writeHead(200, {
            Status: 'WARNING',
            Code: 'WARNING-CODE'
          })
          res.write('Please, fill all the data')
          res.end()
        } else {
          let template = './views/comment-added.html'
          let data = []
          let partials = { header: headerModule, styles: stylesSection }

          let numberOfCommentsSavedByNow = Object.keys(comments).length
          let numberOfMyComment = parseInt(numberOfCommentsSavedByNow + 1)
          let carId = parseInt(postData['carId'])

          let myComment = ({
            id: numberOfMyComment,
            username: postData['username'],
            commentText: postData['commentText'],
            createdOn: new Date(),
            carId: carId
          })

          comments.push(myComment)
          console.log(comments)

          data = myComment

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
