const mongoose = require('mongoose')

const user = new mongoose.Schema({
    company: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength : [6, 'minimum password length : 6 chars']
    }
}, {timestamps : true})

const userSchema = mongoose.model('user', user)
module.exports = userSchema