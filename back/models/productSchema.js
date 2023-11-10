const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        maximum: 50,
        default: 0
    },
    company: {
        type: String,
        required: true
    }
}, {timestamps : true})

const productSchema = mongoose.model('product', product)
module.exports = productSchema