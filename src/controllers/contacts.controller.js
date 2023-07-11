const { ContactService } = require("../service")


class ContactController{
getContacts = async(req,res)=>{
    res.send({
        status:'succes',
        payload:'contactos get'
    })
}
createContacts = async(req,res)=>{
    let {name, last_name, phone}=req.body
   
    let result = await ContactService.create({name, last_name, phone})
    res.send({
        status:'succes',
        payload: result
    })
}
}

module.exports= new ContactController()