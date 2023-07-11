const {Router} =require('express')
const CartManager = require('../dao/mongo/cart.mongo.js')
const { cartModel } = require("../dao/mongo/model/cart.model.js")
const router = Router()
const{getCarts, CreateCart, getById,AddProduct,DeleteProduct,Deletecart,UpdateCart,UpdateQuantity,purchase}=require("../controllers/carts.controller.js")

router.get('/', getCarts)

router.post('/', CreateCart)

router.get('/:cid', getById)

router.post('/:cid/products/:pid', AddProduct)

router.delete('/:cid/product/:pid',DeleteProduct )

router.delete('/:cid',Deletecart )

router.put('/:cid', UpdateCart)

router.put('/:cid/product/:pid', UpdateQuantity )

router.post('/:cid/purchase',purchase)

module.exports = router