const { Router } = require('express')
const CartManager = require('../dao/mongo/cart.mongo.js')

const router = Router()


router.get('/realtimeproducts', (req,res)=>{
res.render('realTimeProducts',  {})



})

router.get('/chat', (req, res)=>{
    res.render('chat', {})
})


router.get('/', (req, res)=>{

    let user = users[Math.floor( Math.random() * users.length )]

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
    // const {name, email, password} = req.body
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
    res.render('newPass',newPassView)
})
module.exports = router