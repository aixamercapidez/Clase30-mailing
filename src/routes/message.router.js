const {Router} =require('express')

const router = Router()
const{getMessage,Addmessage}=require("../controllers/message.controller.js")


router.get('/', getMessage)

router.post('/', Addmessage)


module.exports = router