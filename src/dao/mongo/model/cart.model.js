const { Schema, model } = require('mongoose')
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const collection = 'carts'

const cartSchema = new Schema({
    Products: [{
        idProduct: {
            type: Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: Number,
        cartid:String,


    }]


})
cartSchema.pre('findOne',function(){
    this.populate('Products.idProduct')
})
cartSchema.plugin(mongoosePaginate)
const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}

