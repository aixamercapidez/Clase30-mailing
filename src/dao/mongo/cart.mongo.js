const { cartModel } = require("./model/cart.model")

class CartManagerMongo {

    async getCarts() {
        try {
            return await cartModel.find({})
        } catch (err) {
            return new Error(err)
        }
    }
    async getCartById(cid) {
        try {
            return await cartModel.findOne({ _id: cid }).lean()
        } catch (error) {
            return new Error(error)
        }

    }
    async addCart(newCart) {
        try {

            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }

    // async addProduct(cid,pid){
    //     try {
    //         const cart = await cartModel.findOne({_id: cid})
    //         //const product = cart.Products.find(Products =>Products.idProduct === pid);
    //         const product = cart.Products.find(Products =>Products.idProduct._id.toString() === pid);
    //         if(product===-1){
    //             return await cartModel.findByIdAndUpdate(
    //                 {_id: cid},
    //                 {$push: {Products: {idProduct:pid, quantity: 1}}},
    //                 {new:true,upsert:true}
    //             )

    //         }else{
    //             return await cartModel.findOneAndUpdate(
    //                 {_id: cid, "Products.idProduct":pid},
    //                 {$inc: {"Products.$.quantity": 1}},
    //                 {new:true}
    //             )
    //         }



    //     } catch (error) {
    //         return new Error(error)
    //     }

    // }

    addProduct = async (cid, pid) => {
        try {
            const cart = await cartModel.findOneAndUpdate(
                { _id: cid, "Products.idProduct": pid },
                { $inc: { "Products.$.quantity": 1 } },
                { new: true }
            )
            if (!cart) {
                const cart = await cartModel.findOneAndUpdate(
                    { _id: cid },
                    { $addToSet: { Products: { idProduct: pid, quantity: 1 , cartid:cid} } },
                    { new: true }
                )
                return cart
            }
            return cart
        } catch (error) {
            console.log(`Error agregando producto al carrito: ${error.message}`)
        }
    }


    // async deleteProduct(cid,pid){
    //     try {            

    //         return await cartModel.findOneAndUpdate(
    //             {_id:cid},
    //             {$pull:{products:{product:pid}}},
    //             {new:true}
    //         )

    //     } catch (error) {
    //         return new Error(error)
    //     }
    // }
    deleteProduct = async (cid, pid) => {
        try {

            const cart = await this.getCartById(cid)
      const quantity = cart.Products.find(item => item.idProduct._id).quantity
      if (quantity > 1) {
            
            
                const cart = await cartModel.findOneAndUpdate(
                    { _id: cid, "Products.idProduct": pid },
                    { $inc: { "Products.$.quantity": -1 } },
                    { new: true }
                ) 
                return cart
            
            } else {
                const cart = await cartModel.findOneAndUpdate(
                  { _id: cid },
                  { $pull: { "Products": { "idProduct": pid } } },
                  { new: true }
                )
                return cart;
              }

        } catch (error) {
            console.log(`Error eliminando producto del carrito: ${error.message}`)
        }
    }
    async deleteCart(cid) {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { Products: [] } },
                { new: true }
            )

        } catch (error) {
            return new Error(error)
        }
    }
    async UpdateCart(cid, updatecart) {
        try {
            let respuesta = await cartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [updatecart] } },
                { new: true }
            )
            return respuesta
        } catch (error) {
            return new Error(error)
        }
    }
    async Updatequantity(cid, pid, quantity) {
        try {

            let respuesta = await cartModel.findOneAndUpdate(
                { _id: cid, 'Products.product': pid },
                { $inc: { 'products.$.quantity': quantity } },
                { new: true }
            )
            return respuesta
        } catch (error) {
            return new Error(error)
        }
    }

}

module.exports = CartManagerMongo