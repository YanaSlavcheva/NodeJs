let date1 = new Date()
let date2 = new Date(date1)
let date3 = new Date(date1)
date2.setMinutes(date1.getMinutes() + 1)
date3.setMinutes(date1.getMinutes() + 2)

let carsList = [{ id: 1,
    make: 'BMW',
    model: 'E36',
    price: '20000',
    imagePath: 'bmw-e36.jpg',
    createdOn: date1,
    isDeleted: false,
    views: 0 },
    { id: 2,
    make: 'BMW',
    model: 'E30',
    price: '40000',
    imagePath: 'bmw-e30.jpg',
    createdOn: date2,
    isDeleted: false,
    views: 0 },
    { id: 3,
    make: 'BMW',
    model: 'E46',
    price: '60000',
    imagePath: 'bmw-e46.jpg',
    createdOn: date3,
    isDeleted: true,
    views: 0 }]

module.exports = carsList
