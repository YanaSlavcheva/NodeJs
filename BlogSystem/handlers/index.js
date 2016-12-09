let favicon = require('./favicon')
let homePage = require('./home-page')
let addBlogPostInfo = require('./add-blog-post-info')
let readFile = require('./read-file')
let blogPostsAll = require('./blog-posts-all')
let blogPostDetails = require('./blog-post-details')
let addCommentInfo = require('./add-comment-info')

module.exports = [
  favicon,
  homePage,
  addBlogPostInfo,
  blogPostsAll,
  blogPostDetails,
  addCommentInfo,
  readFile
]
