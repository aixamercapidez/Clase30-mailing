const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'usuarios'

const userSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    cartID: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    date_of_birth: { Date },
    role: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'premium'],
        default: 'user'
    },
    documents: [
        {
            name: {
                type: String,
                required: true,
            },
            reference: {
                type: String,
                required: true,
            },
        },
    ],
    last_connection: {
        type: String
    }

})

userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)
module.exports = {
    userModel
}
