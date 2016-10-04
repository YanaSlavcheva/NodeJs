let http = require('http')

http
    .createServer((req, res) => {
      if (req.method === 'POST') {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write('You opened the test POST page, Congrats!')
        res.end()
      } else if (req.method === 'GET') {
        res.writeHead(500)
        res.write('Internal server error - YANA')
        res.end()
      }
    })
    .listen(1357)

