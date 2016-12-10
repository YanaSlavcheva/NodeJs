let favicon = require('./favicon')
let homePage = require('./home-page')
let addCar = require('./add-car')
let readFile = require('./read-file')
let carsAll = require('./cars-all')
let blogPostDetails = require('./blog-post-details')
let addCommentInfo = require('./add-comment-info')

module.exports = [
  favicon,
  homePage,
  addCar,
  carsAll,
  blogPostDetails,
  addCommentInfo,
  readFile
]
