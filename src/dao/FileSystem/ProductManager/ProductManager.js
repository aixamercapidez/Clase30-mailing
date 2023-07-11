const fs = require('fs')

class ProductManager {
    constructor() {


        this.path = './ProductManager/Products.json'

    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
          
            const products = JSON.parse(data);
            return products;
        }
        else {
            return []
        }
    }

    addProduct = async (productNew) => {
        try {
            const products = await this.getProducts();
            let newcode = await products.find(prod => prod.code === productNew.code)
            if (newcode) { return 1 }
            else {

               
                    
                    const product = {};
                    product.title = productNew.title
                    product.description = productNew.description
                    product.price = productNew.price
                    product.thumbnail = [productNew.thumbnail]
                    product.stock = productNew.stock
                    product.code = productNew.code
                    product.status = true
                    product.category = productNew.category

                    if (products.length === 0) {
                        product.id = 1

                    } else {
                        product.id = await products[products.length - 1].id + 1;
                    }


                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return console.log("success")
                
            }
        } catch (error) {
            return (error)

        }

    }
    getProductById = async (productId) => {

        const products = await this.getProducts();
        let producto = products.find(prod => prod.id === productId)
        if (!producto) return 'Not found'
        return producto

    }

    updateProduct = async (productId, productUpdate) => {
        try {
            const products = await this.getProducts();
            let product = products.find(prod => prod.id === productId)
            if (!product) return 'Not found'
            product.title = productUpdate.title
            product.description = productUpdate.description
            product.price = productUpdate.price
            product.thumbnail = productUpdate.thumbnail
            product.stock = productUpdate.stock
            product.code = productUpdate.code
            await fs.promises.writeFile(this.path, JSON.stringify(products, 'utf-8', '\t'))
            return 'successfully Updated Product'
        }
        catch (error) {
            return (error)
        }
    }

    deleteProduct = async (productId) => {

        try {
           
            const products = await this.getProducts();

            let product = products.find(prod => prod.id === productId)
            if (!product) {return 1}
            else{
            let productdelete = products.filter(prod => prod.id !== productId)

            await fs.promises.writeFile(this.path, JSON.stringify(productdelete, 'utf-8', '\t'))
            return 'successfully Deleted Product'
            }

        }
        catch (error) {
            return (error)
        }

    }



}


module.exports = { ProductManager };