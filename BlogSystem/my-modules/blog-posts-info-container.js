let date1 = new Date()
let date2 = new Date(date1)
let date3 = new Date(date1)
date2.setMinutes(date1.getMinutes() + 1)
date3.setMinutes(date1.getMinutes() + 2)

let blogPostsInfoList = [{ id: 1,
    title: '1 test first',
    description: 'ldkjfghlkdfgjn',
    url: 'https://s-media-cache-ak0.pinimg.com/736x/5b/11/c6/5b11c6b5eabb728c76b652c330ddaf8e.jpg',
    createdOn: date1,
    isDeleted: false,
    views: 0 },
  { id: 2,
    title: '2 second test',
    description: 'sdhsdfhsfgh',
    url: 'https://s-media-cache-ak0.pinimg.com/736x/5b/11/c6/5b11c6b5eabb728c76b652c330ddaf8e.jpg',
    createdOn: date2,
    isDeleted: false,
    views: 0 },
  { id: 2,
    title: '3 third test',
    description: 'sdhsdfhsfgh',
    url: 'https://s-media-cache-ak0.pinimg.com/736x/5b/11/c6/5b11c6b5eabb728c76b652c330ddaf8e.jpg',
    createdOn: date3,
    isDeleted: true,
    views: 0 }]

module.exports = blogPostsInfoList
