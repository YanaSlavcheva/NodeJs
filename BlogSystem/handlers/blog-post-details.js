let url = require('url')
let fs = require('fs')
let qs = require('querystring')

let mustache = require('./../node_modules/mustache/mustache')

let blogPostsInfo = require('./../my-modules/blog-posts-info-container.js')
let commentsInfo = require('./../my-modules/comments-info-container.js')
let headerModule = require('./../my-modules/header')
let stylesSection = require('./../my-modules/styles')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details') && !req.pathname.endsWith('/comment')) {
    if (req.method === 'GET') {
      let template = 'blog-post-details.html'
      let splitPathname = req.pathname.split('/')
      let blogPostId = splitPathname[splitPathname.length - 1]

      var result = blogPostsInfo.filter(function (obj) {
        if (obj.id === parseInt(blogPostId)) {
          return obj
        }
      })

      if (result.length > 0) {
        let blogPost = result[0]
        blogPost.views = blogPost.views + 1

        let commentsForBlogPost = commentsInfo.filter(function (obj) {
          return obj.blogPostId === blogPost.id
        })

        blogPost.comments = commentsForBlogPost

        let data = blogPost
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
        res.write('No such blog post')
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
          res.write('Sorry, cannot delete blog post now')
          res.end()
        } else {
          let blogPostId = parseInt(postData['id'])
          let currentBlogPost = blogPostsInfo.filter(function (obj) {
            return obj.id === blogPostId
          })

          if (currentBlogPost) {
            if (currentBlogPost[0]['isDeleted'] === true) {
              currentBlogPost[0]['isDeleted'] = false
            } else {
              currentBlogPost[0]['isDeleted'] = true
            }
          }

          console.log(currentBlogPost[0])

          res.writeHead(302, {
            'Location': '/details/' + currentBlogPost[0]['id']
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
