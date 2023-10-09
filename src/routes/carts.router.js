

const CartsController = require("../controllers/carts.controller");

const RouterClass = require("./RouterClass");

const cart = new CartsController()

class CartRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], cart.getCarts)
        this.post('/', ['PUBLIC'], cart.CreateCart)
        this.get('/:cid', ['PUBLIC'], cart.getById)
        this.get('/:cid/products/:pid', ['USER', 'PREMIUM'], cart.AddProduct)
        this.get('/delete/:cid/product/:pid', ['USER', "PREMIUM", "ADMIN"], cart.DeleteProduct)
        this.delete('/:cid', ['PUBLIC'], cart.Deletecart)
        this.put('/:cid', ['PUBLIC'], cart.UpdateCart)
        this.put('/:cid/product/:pid', ['PUBLIC'], cart.UpdateQuantity)
        this.get('/:cid/purchase', ['USER', "PREMIUM", "ADMIN"], cart.purchase)
    }
}

module.exports = CartRouter