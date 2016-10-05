let favicon = require('./handlers/favicon')
let homePage = require('./handlers/home-page')
let readFile = require('./handlers/read-file')

module.exports = [
  favicon,
  homePage,
  readFile
]
