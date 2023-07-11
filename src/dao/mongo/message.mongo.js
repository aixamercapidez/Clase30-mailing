const { messageModel } = require("./model/message.model")

class MessageManagerMongo {
    
    async getmessage(){
        try{
            return await messageModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async addmessage(newmessage){
        try {
            
            return await messageModel.create(newmessage)
        } catch (error) {
            return new Error(error)
        }
    }
   
}

module.exports = MessageManagerMongo