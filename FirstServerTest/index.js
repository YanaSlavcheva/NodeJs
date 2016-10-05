// 02:05:17

let http = require('http')

let favicon = require('./handlers/favicon')
let homePage = require('./handlers/home-page')
let readFile = require('./handlers/read-file')

let portNumber = 1112

http
    .createServer((req, res) => {
      let handlers = [
        favicon,
        homePage,
        readFile
      ]

      for (let handler of handlers) {
        let readNextHandler = handler(req, res)
        if (!readNextHandler) break
      }
    })
    .listen(portNumber)

console.log(`Server listening on port ${portNumber}`)

