const {Schema, model} = require('mongoose')

const collection = 'message'

const messageSchema = new Schema({
  
        message: String,
       
    
    
})

const messageModel = model(collection, messageSchema)

module.exports = {
    messageModel
}

