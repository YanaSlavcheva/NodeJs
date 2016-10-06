let http = require('http')

let handlers = require('./handlers/index')

let portNumber = 1112

http
    .createServer((req, res) => {
      for (let handler of handlers) {
        let readNextHandler = handler(req, res)
        if (!readNextHandler) break
      }
    })
    .listen(portNumber)

console.log(`Server listening on port ${portNumber}`)

