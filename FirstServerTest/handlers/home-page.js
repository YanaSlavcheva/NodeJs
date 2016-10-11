let fs = require('fs')
let url = require('url')

let mustache = require('./../node_modules/mustache/mustache')

let headerModule = require('./../my-modules/header')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/') {
    // fs.readFile('./index.html', (err, data) => {
    //       // TODO: manage the err as proper res
    //   if (err) console.log(err)
    //   res.writeHead(200, {
    //     'Content-Type': 'text/html'
    //   })
    //   res.write(data)
    //   res.end()
    // })

    var template = './index.html'
    var data = []
    var partials = {header: headerModule}

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
