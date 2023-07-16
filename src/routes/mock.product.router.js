const {Router} =require('express')
const router = Router()
const { getProducts, simple, compleja } = require("../controllers/mock.controller");



router.get('/', getProducts)
router.get('/simple', simple)
router.get('/compleja', compleja)


module.exports = router