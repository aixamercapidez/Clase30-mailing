const {MessageService} = require("../service/index")

class MessageController{
   getMessage= async (req,res)=>{
        try {
            const message = await MessageService.getmessage()
            res.status(200).send({
                status: 'success',
                payload: message
            })
            
        } catch (error) {
            cconsole.log(error)
        }
    }
  Addmessage=  async (req, res)=>{
        try {
            
            const newmessage = req.body
            let result = await MessageService.addmessage(newmessage)
    
            const {email} = req.session.user
            let userDB = await userModel.findOne({email})
            let role = userDB.role
    if (role != "user"){
        res.status(401).send({
            status: 'acces denied',
            
        })
    }else{
            res.status(200).send({
                status: 'success',
                payload: result
            })}
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports= new MessageController()