const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'usuarios'

const userSchema = new Schema ({
    first_name:{
        type: String,
    },
    last_name:{
        type:String
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    date_of_birth:{ Date},
    role:String,
   password:String,
  

})

userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)
module.exports = {
    userModel
}
