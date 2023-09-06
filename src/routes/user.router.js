const { Router } = require('express');
const uploader = require("../utils/multer");
const router = Router()
const{updateRol, document, getUsers, deleteUsers, deleteUser}=require("../controllers/users.controller")

router.get('/', getUsers)
router.get('/premium/:UID', updateRol)
router.post('/:UID/documents', uploader.fields([
    { name: "profile", maxCount: 1 },
    { name: "products", maxCount: 1 },
    { name: "identification", maxCount: 1 },
    { name: "comprobant", maxCount: 1 },
    { name: "accountStatus", maxCount: 1 },
]),document)
router.delete('/deleteusers', deleteUsers)
router.get('/delete/:UID', deleteUser)

module.exports = router