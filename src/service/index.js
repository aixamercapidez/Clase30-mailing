const { 
    CartDao, 
    ProductDao, 
    ContactDao,
    TicketDao
} = require("../dao/factory")

const MessageDaoMongo = require("../dao/mongo/message.mongo")
const ContactRepository = require("../repositories/contacts.repository")
const ProductRepository = require("../repositories/products.repository")
const CartRepository = require("../repositories/carts.repository")
const ticketRepository= require ('../repositories/ticket.repository')

const ProductsService = new ProductRepository(new ProductDao())
const CartsService = new CartRepository(new CartDao())
const ContactService = new ContactRepository(new ContactDao())
const MessageService = new MessageDaoMongo()
const TicketService = new ticketRepository(new TicketDao())


module.exports = {
ProductsService,
CartsService,
MessageService,
ContactService,
TicketService

}


