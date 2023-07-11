const { CartsService, TicketService } = require("../service/index")
const { ProductsService } = require("../service/index")
const { uuidv4 } = require('uuidv4')
const { randomUUID } = require('crypto')

class CartsController {
    getCarts = async (req, res) => {
        try {
            const carts = await CartsService.getCarts()
            res.status(200).send({
                status: 'success',
                payload: carts
            })




        } catch (error) {
            console.log(error)
        }
    }

    CreateCart = async (request, response) => {
        try {


            let result = await CartsService.addCart()


            res.status(200).send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await CartsService.getCartById(cid)
            /* res.render('carts', {
                 status: 'success',
                 payload: cart,
                 carts: cart
             })*/
            /* res.status(200).send({
                 status: 'success',
                 payload: cart
             })*/
            res.send(cart)
        } catch (error) {
            console.log(error)
        }
    }

    AddProduct = async (req, res) => {
        try {
            const { cid } = req.params
            const { pid } = req.params

            const cart = await CartsService.addProduct(cid, pid)

            const {email} = req.session.user
            let userDB = await userModel.findOne({email})
            let role = userDB.role
    if (role != "user"){
        res.status(401).send({
            status: 'acces denied',
            
        })
    }else{


            res.status(200).send({
                status: 'success',
                payload: cart
            })}

        } catch (error) {
            console.log(error)
        }
    }
    DeleteProduct = async (req, res) => {
        try {
            const { cid } = req.params
            const { pid } = req.params

            const cart = await CartsService.deleteProduct(cid, pid)
            res.status(200).send({
                status: 'success',
                payload: cart
            })

        } catch (error) {
            console.log(error)
        }
    }

    Deletecart = async (req, res) => {
        try {
            const { cid } = req.params

            const cartdeleted = await CartsService.deleteCart(cid)
            res.status(200).send({
                status: 'success',
                payload: cartdeleted
            })

        } catch (error) {
            console.log(error)
        }
    }
    UpdateCart = async (req, res) => {
        try {
            const { cid } = req.params
            const { updatecart } = req.body
            const cart = await CartsService.updateCart(cid, updatecart)
            res.status(200).send({
                status: 'success',
                payload: cart
            })

        } catch (error) {
            console.log(error)
        }
    }
    UpdateQuantity = async (req, res) => {
        try {
            const { cid } = req.params
            const { pid } = req.params
            const { quantity } = req.body
            const cart = await CartsService.Updatequantity(cid, pid, quantity)
            res.status(200).send({
                status: 'success',
                payload: cart
            })

        } catch (error) {
            console.log(error)
        }
    }
    purchase = async (req, res) => {
            try {
                const { cid } = req.params
                const cart = await CartsService.getCartById(cid)
                if (!cart) return error

                const leftProducts = []
                for (const item in cart.Products) {
                    const idProduct = item.idProduct
                    const quantity = item.quantity
                  // const product = await ProductsService.getProductById(idProduct)
                  //  const stock = product.stock
                  const stock = item.idProduct.stock

                    if (quantity > stock) {
                        leftProducts.push(idProduct)

                    } else {
                        const respuesta = await ProductsService.updateProduct(idProduct, {quantity: stock-quantity})


                    }

                }
               let  amount= await cart.Products.filter(product => !leftProducts.includes(item.idProduct)).reduce()

                const {email} = req.session.user
                const ticket = await TicketService.newTicket(randomUUID, amount,email)
                   
                   // 
                  


               

                if (leftProducts.length > 0) {

                    const updated = await CartsService.UpdateCart(cid, leftProducts)

                } else {
                    await CartsService.deleteCart(cid)
                }

                res.send({
                    status: 'succes',
                    payload:ticket


                })
            }
            catch {
                return 'error'
            }
        // try {
        //     const { CID } = req.params

        //     const { products } = await CartsService.getById(CID) ?? {}

        //     if (!products) return res.status(404).sendUserError("Cart not found")
        //     if (products.length === 0) return res.status(400).sendUserError('Cart is empty')

        //     //Array con los productos que no son comprables
        //     const unbuyableProducts = products.filter(Products => Products.idProduct.stock < Products.quantity).map(item => item.idProduct.toString())

        //     let totalCompra = 0;
        //     //Se pueden comprar todos los productos
        //     if (unbuyableProducts.length === 0) {
        //         products.forEach(async item => {
        //             const { idProduct, quantity } = item
        //             totalCompra += idProduct.price * quantity
        //             await ProductsService.updateProduct(idProduct.toString(), { stock: idProduct.stock - quantity })
        //             await CartsService.deleteCart(CID)

        //         })
        //         const generateTicket = await TicketService.newTicket(randomUUID(), totalCompra, "req.user.email")
        //         return res.status(400).sendSuccess(generateTicket)
        //     }

        //     //Se guardan los productos que si están disponibles
        //     const buyableProducts = [];

        //     products.forEach(async item => {
        //         const findBuyable = unbuyableProducts.find(noStockProductsid => noStockProductsid === item.idProduct.toString())
        //         if (!findBuyable) buyableProducts.push(item)
        //     })

        //     //No se pudo comprar ningun producto
        //     if (buyableProducts.length === 0) return res.status(400).sendUserError({ message: "Can't complete the purchase process", products: unbuyableProducts })

        //     //Se pueden comprar algunos productos
        //     for (const item of buyableProducts) {
        //         const { idProduct, quantity } = item
        //         totalCompra += idProduct.price * quantity
        //         //actualizar los productos que si se compraron
        //         await ProductsService.updateProduct(idProduct.toString(), { stock: idProduct.stock - quantity })
        //         //Retirar del carrito los productos que si se compraron
        //         await CartsService.deleteProduct(CID, idProduct.toString())
        //     }
        //     const generateTicket = await TicketService.newTicket(randomUUID(), totalCompra, "req.user.email")

        //     res.status(200).sendSuccess({ message: 'Compra realizada', ticket: generateTicket, productosNoDisponibles: unbuyableProducts })
        // } catch (error) {
        //     return res.status(500)
        // }
    }







}



module.exports = new CartsController()