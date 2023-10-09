const { CartsService, TicketService } = require("../service/index")
const { ProductsService } = require("../service/index")
const { uuidv4 } = require('uuidv4')
const { randomUUID } = require('crypto')
const sendMail = require('../utils/sendmail')
const { userModel } = require("../dao/mongo/model/user.model")
class CartsController {
    getCarts = async (req, res) => {
        try {
            const carts = await CartsService.getCarts()
            res.status(200).send({
                status: 'success',
                payload: carts
            })




        } catch (error) {
            console.log("error")
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
            console.log("error")
        }
    }

    getById = async (req, res) => {
        try {
            const {cid} = req.params
            
            
            const {Products}  = await CartsService.getCartById(cid)
            const { first_name } = req.session.user
            const { last_name } = req.session.user
            const email = req.session.user.email
            
            let userDB = await userModel.findOne({ email })
            let role = userDB.role
            let cartID = userDB.cartID
            


            res.render('cart', {
                first_name,
                last_name,
                email,
                Products,
                role,
                cid,
                cartID,
                





            })

        } catch (error) {
            console.log("error")
        }
    }

    AddProduct = async (req, res) => {
        try {
            const { cid } = req.params
            const { pid } = req.params

            const { email } = req.session.user
            let userDB = await userModel.findOne({ email })
            
            
            const id = userDB._id.toString()



            let product = await ProductsService.getProductById(pid)

            if (id == product.owner){
                res.status(403).send({
                    status: 'access denied, you cant buy your own products',
                    
                })

            }else{


            const cart = await CartsService.addProduct(cid, pid)







            res.redirect(`/api/carts/${cid}`)}

        } catch (error) {
            console.log("error")
        }
    }

    DeleteProduct = async (req, res) => {
        try {
            const { cid } = req.params
            const { pid } = req.params

            const cart = await CartsService.deleteProduct(cid, pid)

            res.redirect(`/api/carts/${cid}`)
        } catch (error) {
            console.log("error")
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
            console.log("error")
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
            console.log("error")
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
            console.log("error")
        }
    }
    purchase = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await CartsService.getCartById(cid)
            if (!cart) return error
            let totalCompra = 0;
            let leftProducts = []
            for (const item of cart.Products) {
                const idProduct = item.idProduct
                const quantity = item.quantity

                const price = item.idProduct.price
                const stock = item.idProduct.stock

                if (quantity > stock) {
                    leftProducts.push(idProduct._id)

                } else {

                    totalCompra += quantity * price


                }

            }


            const { email } = req.session.user
            console.log(email)
            const ticket = await TicketService.newTicket(randomUUID(), totalCompra, email)







            if (leftProducts.length > 0) {

                const updated = await CartsService.UpdateCart(cid, leftProducts)

            } else {
                await CartsService.deleteCart(cid)
            }


            const html = `
                <center>
                    <p>
                        enviamos su ticket ${ticket}
                    </p>
                   
                </center>
            `
            sendMail(email, "ticket", html)
            res.send({
                status: 'succes',
                payload: ticket


            })
        }
        catch {
            console.log("error")
        }

    }







}



module.exports = CartsController