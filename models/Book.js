const { Schema, model, default: mongoose } = require('mongoose')

const schema = new Schema({
    bookName: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    page: {type: String, required: true},
    year: {type: String, required: true},
    language: {type: String, required: true},
    price: {type: String, required: true},
    img: {type: String, required: true},
    sellerId: {type: String, required: true},
})

module.exports = model('Book', schema)
