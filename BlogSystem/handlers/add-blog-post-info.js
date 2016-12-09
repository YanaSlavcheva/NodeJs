let url = require('url')
let fs = require('fs')
let qs = require('querystring')
let multiparty = require('multiparty')

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
      let numberOfBlogPostsSavedByNow = Object.keys(blogPostsInfo).length
      let numberOfOurPost = numberOfBlogPostsSavedByNow + 1

      let myBlogPostInfo = ({
        id: numberOfOurPost,
        createdOn: new Date(),
        isDeleted: false,
        views: 0
      })

      let returnData = []

      let form = new multiparty.Form()
      form.parse(req)

      form.on('part', (part) => {
        if (part.filename) {
          let body = ''

          part.setEncoding('binary')
          part.on('data', (data) => { body += data })
          part.on('end', () => {
            fs.writeFile(part.filename, body, err => {
              if (err) throw err
            })
          })
        } else {
          let body = ''
          let dict = []
          let partName = '' + part.name

          part.on('data', data => {
            body += data

            if (body.length > 1e6) {
              req.connection.destroy()
            }
          })

          part.on('end', () => {
            dict[partName] = body

            // if (!postData['title'] || !postData['description']) {
            //   res.writeHead(200, {
            //     Status: 'WARNING',
            //     Code: 'WARNING-CODE'
            //   })

            //   // TODO: return some html here
            //   res.write('Please, fill all the data')
            //   res.end()
            // } else {

            myBlogPostInfo[partName] = dict[partName]
            // }
          })
        }
      })

      blogPostsInfo.push(myBlogPostInfo)
      console.log(blogPostsInfo)

      returnData = myBlogPostInfo

      let template = './blog-post-added.html'
      let partials = { header: headerModule, styles: stylesSection }

      fs.readFile(template, function (err, template) {
        if (err) throw err

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        template = template.toString()
        res.write(mustache.to_html(template, returnData, partials))
        res.end()
      })
    }
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
