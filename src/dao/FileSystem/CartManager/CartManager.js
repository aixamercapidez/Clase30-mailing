const fs = require('fs')

class CartManager {
    constructor() {

       
        this.path = './CartManager/Cart.json'

    }
    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            console.log(data);
            const carts = JSON.parse(data);
            return carts;
        }
        else {
            return []
        }
    }

    addCart = async () => {
        const carts = await this.getCarts();
        
        const cart = {}
        cart.products = [] ;
       

       if(carts.length === 0){
        cart.id = 1

       }else{
        cart.id = await carts[carts.length - 1].id + 1;
       
       }
        
        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    

    }
    getcartById = async (cartId) => {

        const carts = await this.getCarts();
        let cart = carts.find(prod => prod.id === cartId)
        if (!cart) return 'Not found'
        return cart

    }

    addProduct = async (cartId,productId) => {
        try {
            const carts = await this.getCarts();
            let cart = carts.find(prod => prod.id === cartId)
            if (!cart) return 'Not found'
            const product = cart.products
            let  prod= product.find(prod => prod.id === productId)
            if (!prod) {
                const newproduct = {}
                newproduct.id = productId
                newproduct.quantity = 1
                product.push(newproduct)
            }else{
                prod.quantity = prod.quantity + 1
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(carts, 'utf-8', '\t'))
            return 'successfully Updated Product'
        }
        catch (error) {
            return (error)
        }
    }

  



}


module.exports = { CartManager };