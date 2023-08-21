const { Router } = require('express');

const router = Router()
const{updateRol}=require("../controllers/users.controller")

router.get('/premium/:UID', updateRol)


module.exports = router