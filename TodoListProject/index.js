let http = require('http')

let favicon = require('./handlers/favicon')
let homePage = require('./handlers/home-page')
let readFiles = require('./handlers/read-files')
let createTask = require('./handlers/create-task')

let portNumber = 1111

http
    .createServer((req, res) => {
      let handlers = [
        favicon,
        homePage,
        createTask,
        readFiles
      ]

      for (let handler of handlers) {
        let next = handler(req, res)
        if (!next) {
          break
        }
      }
    })
    .listen(portNumber)

console.log(`Server listening on port ${portNumber}`)

