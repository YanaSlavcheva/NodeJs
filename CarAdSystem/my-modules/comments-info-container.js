let date1 = new Date()
let date2 = new Date(date1)
let date3 = new Date(date1)
date2.setMinutes(date1.getMinutes() + 1)
date3.setMinutes(date1.getMinutes() + 2)

let commentsInfoList = [{ id: 1,
    username: 'Pesho',
    commentText: 'ldkjfghlkdfgjn',
    blogPostId: 1,
    createdOn: date1 },
    { id: 2,
    username: 'Gosho',
    commentText: 'ldkjfghlkdfgjn',
    blogPostId: 1,
    createdOn: date2 },
    { id: 3,
    username: 'Ivan',
    commentText: 'ldkjfghlkdfgjn',
    blogPostId: 2,
    createdOn: date3 }]

module.exports = commentsInfoList
