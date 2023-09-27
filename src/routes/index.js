const { Router } = require('express')

const productRouter = require('./products.router.js')
const productCart = require('./carts.router.js')
const messageRouter = require('./message.router.js')
const sessionRouter = require('./session.router')   
const contactsRouter = require('./contacts.router')


const loggerRouter = require('./logger.router.js')
const MockingProductsRouter = require('./logger.router.js')
const viewsRouter = require('./views.router.js')
const userRouter = require('./user.router.js')
const router = Router()



router.use('/loggertest', loggerRouter)
router.use('/mockingproducts', MockingProductsRouter)

router.use('/api/session', sessionRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', productCart)
router.use('/api/message', messageRouter)
router.use('/api/users', userRouter)
router.use('/', viewsRouter)


router.use('/api/contacts', contactsRouter)

module.exports = router