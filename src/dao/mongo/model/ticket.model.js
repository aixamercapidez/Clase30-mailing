const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'tickets'

const ticketsSchema = new Schema({
    code: {
        type: String,
        
        required: true
    },
    // purchase_datetime: {
    //     type: Date,
        
    //     default: Date.now()
    // },
    amount: {
        type: Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true
    },


})

ticketsSchema.plugin(mongoosePaginate)
const ticketModel = model(collection, ticketsSchema)
module.exports = {
    ticketModel
}
