let date1 = new Date()
let date2 = new Date(date1)
let date3 = new Date(date1)
let date4 = new Date(date1)
let date5 = new Date(date1)
let date6 = new Date(date1)
let date7 = new Date(date1)
let date8 = new Date(date1)
date2.setMinutes(date1.getMinutes() + 1)
date3.setMinutes(date1.getMinutes() + 2)
date4.setMinutes(date1.getMinutes() + 3)
date5.setMinutes(date1.getMinutes() + 4)
date6.setMinutes(date1.getMinutes() + 5)
date7.setMinutes(date1.getMinutes() + 6)
date8.setMinutes(date1.getMinutes() + 7)

let carsList = [{ id: 1,
    make: 'BMW',
    model: 'E36',
    price: '20000',
    imagePath: '/content/images/bmw-e36.jpg',
    createdOn: date1,
    isDeleted: false,
    views: 0 },
    { id: 2,
    make: 'BMW',
    model: 'E30',
    price: '40000',
    imagePath: '/content/images/bmw-e30.jpg',
    createdOn: date2,
    isDeleted: false,
    views: 0 },
    { id: 3,
    make: 'BMW',
    model: 'E46',
    price: '60000',
    imagePath: '/content/images/bmw-e46.jpg',
    createdOn: date3,
    isDeleted: true,
    views: 0 },
    { id: 4,
    make: 'BMW',
    model: '3.0 CSL E9',
    price: '260000',
    imagePath: '/content/images/bmw-3-csl-e9.jpg',
    createdOn: date4,
    isDeleted: false,
    views: 0 },
    { id: 5,
    make: 'VolksWagen',
    model: 'Golf 1.0',
    price: '2600',
    imagePath: '/content/images/vw-golf-1.jpg',
    createdOn: date5,
    isDeleted: false,
    views: 0 },
    { id: 6,
    make: 'BMW',
    model: 'M5 F10',
    price: '260000',
    imagePath: '/content/images/bmw-m5-f10.jpg',
    createdOn: date6,
    isDeleted: false,
    views: 0 },
    { id: 7,
    make: 'Mercedes',
    model: 'Big Bang',
    price: '260',
    imagePath: '/content/images/mercedes-big-bang.jpg',
    createdOn: date6,
    isDeleted: false,
    views: 0 },
    { id: 8,
    make: 'BMW',
    model: 'M1',
    price: '260000',
    imagePath: '/content/images/bmw-m1.jpg',
    createdOn: date8,
    isDeleted: false,
    views: 0 }]

module.exports = carsList
