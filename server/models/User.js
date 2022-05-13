const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    checkPassword: {type: String, required: false},
    icon: {type: String, required: true},
    role: {type: String, required: true},
})

module.exports = model('User', schema)