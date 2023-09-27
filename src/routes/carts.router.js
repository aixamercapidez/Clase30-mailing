const {Router} =require('express')

const router = Router()
const{getCarts, CreateCart, getById,AddProduct,DeleteProduct,Deletecart,UpdateCart,UpdateQuantity,purchase}=require("../controllers/carts.controller.js")

router.get('/', getCarts)

router.post('/', CreateCart)

router.get('/:cid', getById)

router.get('/:cid/products/:pid', AddProduct)

router.get('/delete/:cid/product/:pid',DeleteProduct )

router.delete('/:cid',Deletecart )

router.put('/:cid', UpdateCart)

router.put('/:cid/product/:pid', UpdateQuantity )

router.get('/:cid/purchase',purchase)

module.exports = router