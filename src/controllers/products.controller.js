const { ProductsService } = require("../service/index")
const { productModel } = require('../dao/mongo/model/product.model.js')
const { userModel } = require('../dao/mongo/model/user.model')
const sendMail = require('../utils/sendmail')
const CustomErrors = require("../service/errors/customErrors");
const productEnumError = require("../service/errors/enumError");
const { nullOrEmptyValues } = require("../service/errors/productsErrors");

class ProductsController {
    getProducts = async (req, res) => {
        try {



            const { first_name } = req.session.user
            const { last_name } = req.session.user
            const { email } = req.session.user
            let userDB = await userModel.findOne({ email })
            let role = userDB.role
            let cartID = userDB.cartID
            


            const { page = 1 } = req.query
            const { limit = 10 } = req.query
            const { category } = req.query
            const { status } = req.query
            const { sort } = req.query
            let sortOptions
            if (sort === 'asc') {

                sortOptions = { price: 1 };

            } else if (sort === 'desc') {

                sortOptions = { price: -1 };

            }
            let query = {}
            if (category) {
                query = { category: category }
            }
            if (status) {
                query = { status: status }
            }
            let products = await productModel.paginate(query, { limit: limit, page: page, lean: true, sort: sortOptions })
           

            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = products






            res.render('products', {
                status: 'success',
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                first_name,
                last_name,
                role,
                cartID
            })

        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            const { pid } = req.params
            let product = await ProductsService.getProductById(pid)
            res.status(200).send({
                status: 'success',
                payload: product
            })
        } catch (error) {
            console.log(error)
        }
    }

    AddProduct = async (req, res) => {
        try {
            



            let { title, description, price, code, stock, category, status } = req.body
           
            const { email } = req.session.user
            let userDB = await userModel.findOne({ email })
            const role = userDB.role
            const id = userDB._id
            const newProduct = {
                title,
                description,
                price: Number(price),
                code,
                stock: Number(stock),
                category,
                status,
                thumbnail: "",
                owner: String(id),
            }

            console.log(newProduct)


            
            
                const result = await ProductsService.addProduct(newProduct)
                res.status(200).send({
                    status: 'success',
                    payload: result
                })
            
        } catch (error) {
            console.log(error)
        }
    }

    UpdateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const updateProduct = req.body
            let product = await ProductsService.getProductById(pid)
            let updated = await ProductsService.updateProduct(pid, updateProduct)

            const { email } = req.session.user
            let userDB = await userModel.findOne({ email })
            let userID = userDB._id.toString()

            let role = userDB.role
            if (role != "admin") {
                if (product.owner.toString() !== userID) {
                    res.status(401).send({
                        status: 'acces denied',

                    })
                }
            } else {

                res.status(200).send({
                    status: 'success',
                    payload: updated
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    DeleteProduct = async (req, res) => {
        try {
            const { pid } = req.params

            let product1 = await ProductsService.getProductById(pid)
            const { email } = req.session.user
            let userDB = await userModel.findOne({ email })
            let role = userDB.role
            let userID = userDB._id.toString()

            // if (role === "user") {

            //     res.status(401).send({
            //         status: 'acces denied',

            //     })
              if (product1.owner !== userID) {
                 res.status(401).send({
                     status: 'acces denied',

                 })
             } else {
           
                const html = `
                <center>
                    <p>
                        Se elimino el producto ${pid}
                    </p>
                   
                </center>
            `

                sendMail(email, "Product deleted", html)
                let product = await ProductsService.deleteProduct(pid)
                res.status(200).send({
                    status: 'success',
                    payload: product
                })}
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductsController