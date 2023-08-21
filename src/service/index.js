const { 
    CartDao, 
    ProductDao, 
    ContactDao,
    TicketDao,
    UserDao,
} = require("../dao/factory")

const MessageDaoMongo = require("../dao/mongo/message.mongo")
const ContactRepository = require("../repositories/contacts.repository")
const ProductRepository = require("../repositories/products.repository")
const CartRepository = require("../repositories/carts.repository")
const ticketRepository= require ('../repositories/ticket.repository')
const userRepository= require ('../repositories/user.repository')

const ProductsService = new ProductRepository(new ProductDao())
const CartsService = new CartRepository(new CartDao())
const ContactService = new ContactRepository(new ContactDao())
const MessageService = new MessageDaoMongo()
const TicketService = new ticketRepository(new TicketDao())
const UserService = new userRepository(new UserDao())


module.exports = {
ProductsService,
CartsService,
MessageService,
ContactService,
TicketService,
UserService

}


