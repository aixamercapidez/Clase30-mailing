const { Router } = require('express')
const { ProductsService } = require("../service/index")


const {

    uploader,
    adminPanel
} = require("../controllers/views.controller.js");
const router = Router()

router.get('/home', (req, res) => {
    res.render('principal', {})
})


router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

router.get('/chat', (req, res) => {
    res.render('chat', {})
})


router.get('/', (req, res) => {

    let user = users[Math.floor(Math.random() * users.length)]

    let testUser = {
        title: 'Mercadito Fede',
        user,
        isAdmin: user.role === 'admin',
        food,
        style: 'index.css'
    }

    res.render('index', testUser)
})

router.get('/register', (req, res) => {
    res.render('registerForm', {
        style: 'index.css'
    })
})

router.post('/register', (req, res) => {
  
    const user = req.body
    res.send({
        user,
        mensaje: 'Regístro con éxito'
    })
})
router.get("/realTimeProducts", async (req, res) => {
    const { payload } = await productManager.getProducts();
    const object = {
        style: "index.css",
        title: "Productos en tiempo real",
        products: payload,
    };
    res.render("realTimeProducts", object);
});

router.get('/login', (req, res) => {
    res.render('login', {
        style: 'index.css'
    })
})

router.get('/register', (req, res) => {
    res.render('registerForm', {
        style: 'index.css'
    })
})

const restoreView = {
    title: "Restore Password",
    style: "restore.css",
    script: "restore.js"
}

router.get('/api/session/restore', (req, res) => {
    res.render('restore', restoreView)
})

const newPassView = {
    title: "New Password",
    style: "new_pass.css",
    script: 'newpass.js'
}
router.get('/api/session/restore/:UID', (req, res) => {
    res.render('newPass', newPassView)
})

const uploader1 = {
    title: "uploader",
    style: "new_pass.css",
    script: 'newpass.js'
}
router.get('/api/users/:UID/documents', (req, res) => {
    res.render('uploader', uploader1)
})





router.get('/adminpanel', async (req, res) => {



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

    let normalizedUsers = await userModel.paginate(query, { limit: limit, page: page, lean: true, sort: sortOptions })

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = normalizedUsers
    const { email } = req.session.user
    let userDB = await userModel.findOne({ email })
    let role = userDB.role

    if (role != "admin") {
        res.status(401).send({
            status: 'acces denied',

        })
    } else {
        res.render('adminpanel', {
            status: 'success',
            normalizedUsers: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,

        })
    }
})
router.get('/product/:pid', async (req, res) => {
    const { first_name } = req.session.user
    const { last_name } = req.session.user
    const { email } = req.session.user
    const { pid } = req.params
    let userDB = await userModel.findOne({ email })
    let role = userDB.role
    let cartID = userDB.cartID
    let product = await ProductsService.getProductById(pid)
    const title = product.title
    const description = product.description   
    const price = product.price
    const stock = product.stock   
    const PID = product._id
    res.render('product', {
        title,
        first_name,
        last_name,
        role,
        cartID,
        PID,
        description,
        price,
        stock

    })
});

module.exports = router