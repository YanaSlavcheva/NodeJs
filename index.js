let http = require('http')
let fs = require('fs')

http
    .createServer((req, res) => {
      fs.readFile('./index.html', (err, data) => {
        // TODO: manage the err as proper res
        if (err) console.log(err)
        res.writeHead(200)
        res.write(data)
        res.end()
      })
    })
    .listen(1234)

