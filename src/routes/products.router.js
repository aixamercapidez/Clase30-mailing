

const ProductsController = require("../controllers/products.controller");

const RouterClass = require("./RouterClass");

const product = new ProductsController()


class ProductRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'],product.getProducts)
        this.get('/:pid', ['PUBLIC'], product.getById)
        this.post('/', ['ADMIN', 'PREMIUM'], product.AddProduct)
        this.put('/:pid', ['ADMIN', 'PREMIUM'], product.UpdateProduct)
        this.get('/delete/:pid', ['ADMIN', 'PREMIUM'], product.DeleteProduct)
    }
}

module.exports = ProductRouter