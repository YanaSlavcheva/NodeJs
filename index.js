let http = require('http')
let fs = require('fs')
let url = require('url')

let portNumber = 1112

http
    .createServer((req, res) => {
      var parsedUrl = url.parse(req.url).pathname

      if (parsedUrl === '/favicon.ico') {
        fs.readFile('./favicon.ico', (err, data) => {
          // TODO: manage the err as proper res
          if (err) console.log(err)
          res.writeHead(200)
          res.write(data)
          res.end()
        })
      } else if (parsedUrl === '/') {
        fs.readFile('./index.html', (err, data) => {
          // TODO: manage the err as proper res
          if (err) console.log(err)
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.write(data)
          res.end()
        })
      } else {
        res.writeHead(404)
        res.write('404 Page Not Found')
        res.end()
      }
    })
    .listen(portNumber)

console.log(`Server listening on port ${portNumber}`)

