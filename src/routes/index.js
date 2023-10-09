const { Router } = require('express')

const productRouter = require('./products.router.js')
const cartrouter = require('./carts.router.js')
const messageRouter = require('./message.router.js')
const sessionRouter = require('./session.router')   
const contactsRouter = require('./contacts.router')
const loggerRouter = require('./logger.router.js')
const MockingProductsRouter = require('./logger.router.js')
const viewsRouter = require('./views.router.js')
const userRouter = require('./user.router.js')
const router = Router()
const {auth} = require('../middlewares/auth.js')

const products = new productRouter()
const carts = new cartrouter()
const session = new sessionRouter()
const user = new userRouter()

router.use('/loggertest', auth,loggerRouter)
router.use('/mockingproducts',auth, MockingProductsRouter)
router.use('/api/session', session.getRouter())
router.use('/api/products',auth, products.getRouter())
router.use('/api/carts', auth, carts.getRouter())
router.use('/api/message', auth,messageRouter)
router.use('/api/users',auth, user.getRouter())
router.use('/' , viewsRouter)


router.use('/api/contacts', contactsRouter)

module.exports = router