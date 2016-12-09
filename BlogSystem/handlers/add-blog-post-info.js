let url = require('url')
let fs = require('fs')
let qs = require('querystring')

let mustache = require('./../node_modules/mustache/mustache')

let blogPostsInfo = require('./../my-modules/blog-posts-info-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/create') {
    if (req.method === 'GET') {
      let template = './add-blog-post.html'
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

        if (!postData['title'] || !postData['description'] || !postData['url']) {
          res.writeHead(200, {
            Status: 'WARNING',
            Code: 'WARNING-CODE'
          })

          // TODO: return some html here
          res.write('Please, fill all the data')
          res.end()
        } else {
          let template = './blog-post-added.html'
          let data = []
          let partials = { header: headerModule, styles: stylesSection }

          let numberOfBlogPostsSavedByNow = Object.keys(blogPostsInfo).length

          let myBlogPostInfo = ({
            id: numberOfBlogPostsSavedByNow + 1,
            title: postData['title'],
            description: postData['description'],
            url: postData['url'],
            createdOn: new Date(),
            isDeleted: false,
            views: 0
          })

          blogPostsInfo.push(myBlogPostInfo)
          console.log(blogPostsInfo)

          data = myBlogPostInfo

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
