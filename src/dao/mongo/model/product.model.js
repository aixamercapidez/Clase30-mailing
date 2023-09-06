const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoose = require('mongoose');
const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        ref:"products"
       
    },
    description: String,
    thumbnail: String, 
    price: Number, 
    stock: Number, 
    code: {
        type: String,
        unique: true,
        required: true
    },
    category: String,
    status: {
        type:String,
        
    },
    owner: {
        type: String,
        
        
    },
})

productSchema.plugin(mongoosePaginate)
const productModel = model(collection, productSchema)

module.exports = {
    productModel
}

