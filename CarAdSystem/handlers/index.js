let favicon = require('./favicon')
let homePage = require('./home-page')
let addCar = require('./add-car')
let readFile = require('./read-file')
let carsAll = require('./cars-all')
let carDetails = require('./car-details')
let addComment = require('./add-comment')
let stats = require('./stats')

module.exports = [
  favicon,
  homePage,
  addCar,
  carsAll,
  carDetails,
  addComment,
  stats,
  readFile
]
