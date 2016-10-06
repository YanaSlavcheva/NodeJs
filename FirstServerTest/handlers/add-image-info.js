let url = require('url')
let fs = require('fs')
let qs = require('querystring')

module.exports = function (req, res) {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/add-image-info') {
    if (req.method === 'GET') {
      fs.readFile('./add-image.html', (err, data) => {
        // TODO: manage the err as proper res
        if (err) console.log(err)
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(data)
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

        let imageInfo = [{
          key: postData['name'],
          value: postData['url']
        }]
      })
    }
  }
}
