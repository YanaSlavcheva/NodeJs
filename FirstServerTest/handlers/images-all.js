let url = require('url')

module.exports = function (req, res) {
  let continueWithNextHandler = false
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/images/all') {
    // https://weekendlessons.wordpress.com/2011/04/18/node-js-with-mustache-get-started/
  } else {
    continueWithNextHandler = true
  }

  return continueWithNextHandler
}
