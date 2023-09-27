const { Router } = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')

const passport = require('passport')


const router = Router()
const{login, failurelogin,register,failure,logout,current,counter,privada, restore, newPass}= require("../controllers/session.controller")


router.post('/login', passport.authenticate('login', {failureRedirect:'/failurelogin'}), login )   

router.get('/failurelogin', failurelogin)

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/failure',
    successRedirect: '/login'
}), register)

router.get('/failure', failure)
router.get('/logout', logout)
router.get('/current', current)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), ()=>{})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/views/login'}), async (req, res)=>{
    req.session.user = req.user
     res.redirect('/api/products')
 })



// sesiones 
router.get('/counter',counter )

router.get('/privada', auth, privada)
router.post('/restore', restore)
router.put('/restore/:UID', newPass)



    

module.exports = router