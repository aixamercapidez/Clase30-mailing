const config = require('../config/objectConfig.js')
require('dotenv').config()
let persistance= process.env.PERSISTENCE
   

let CartDao
let ProductDao
let ContactDao
let TicketDao

switch (persistance) {
    case 'MONGO':
       
        const ProductDaoMongo = require('../dao/mongo/product.mongo.js')
        const CartDaoMongo = require('../dao/mongo/cart.mongo.js')
        const ContactDaoMongo = require('../dao/mongo/contact.mongo.js')
        const TicketDaoMongo = require('../dao/mongo/ticket.mongo.js')


        ProductDao = ProductDaoMongo
        CartDao = CartDaoMongo
        ContactDao = ContactDaoMongo
        TicketDao = TicketDaoMongo

        break;

    case 'FILE':
        const ProductDaoFile = require('../dao/FileSystem/ProductManager')
        const CartDaoFile = require('../dao/FileSystem/CartManager')

        ProductDao = ProductDaoFile
        CartDao = CartDaoFile
        break;

    default:
        break;

}

module.exports={
    CartDao,
    ProductDao,
    ContactDao,
    TicketDao
}