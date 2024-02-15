const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    company: {
        type: String,
        required: true
    }
}, {timestamps : true})

const productSchema = mongoose.model('product', product)
module.exports = productSchema