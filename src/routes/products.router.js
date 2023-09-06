const { Router } = require('express')
const productManager = require('../dao/mongo/product.mongo.js')
const { productModel } = require('../dao/mongo/model/product.model.js')
const { userModel } = require('../dao/mongo/model/user.model.js')
const RouterClass = require("./routerClass.js");

const router = Router()
const{getProducts,getById, AddProduct, UpdateProduct,DeleteProduct}=require("../controllers/products.controller.js")

router.get('/', getProducts)

router.get('/:pid',getById )

router.post('/', AddProduct)

router.put('/:pid', UpdateProduct)

router.get('/delete/:pid',DeleteProduct )

module.exports = router