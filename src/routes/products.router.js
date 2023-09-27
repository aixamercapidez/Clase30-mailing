const { Router } = require('express')


const router = Router()
const{getProducts,getById, AddProduct, UpdateProduct,DeleteProduct}=require("../controllers/products.controller.js")

router.get('/', getProducts)

router.get('/:pid',getById )

router.post('/', AddProduct)

router.put('/:pid', UpdateProduct)

router.get('/delete/:pid',DeleteProduct )

module.exports = router