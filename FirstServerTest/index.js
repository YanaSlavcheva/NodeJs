let http = require('http')

let handlers = require('./handlers/index')

let portNumber = 1112

http
    .createServer((req, res) => {
      let imagesInfo = []

      for (let handler of handlers) {
        let readNextHandler = handler(req, res, imagesInfo)
        if (!readNextHandler) break
      }
    })
    .listen(portNumber)

console.log(`Server listening on port ${portNumber}`)

