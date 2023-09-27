const passport = require('passport')
const { CartsService } = require("../service/index")
const local = require('passport-local')
const { userModel } = require('../dao/mongo/model/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const GithubStrategy = require('passport-github2')
const LocalStrategy = local.Strategy

const initPassport = () => {
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{
        const {first_name, last_name,date_of_birth,email} = req.body
        let role = 'user'
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            role = 'admin'
        }
        try {
            let userDB = await userModel.findOne({email: username})
            if (userDB) return done(null, false)
           const cart=await CartsService.addCart()

            let newUser = {
                first_name,
                last_name,
                email: username,
                cartID:cart._id,
                date_of_birth,
                role:role,
                password: createHash(password)
            }

            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error al obtener el usuario'+error)
        }

    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userModel.findOne({_id:id})
        done(null, user)
    })


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        const userDB = await userModel.findOne({email: username})
        try {
            if(!userDB) return done(null, false)
    
            if(!isValidPassword(password, userDB)) return done(null, false)
            return done(null, userDB)
            
        } catch (error) {
            return done(error)
        }
    }))
}

const initPassortGithub = ()=>{
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.54c8ea45289f165d',
        clientSecret:'43de58bd8808c1f6b679ae3dad8b586efd3f9055',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('Profile', profile)
        try {
            let user = await userModel.findOne({email: profile._json.email})
            // if(user)
            if(!user){
                let newUser = {
                    firts_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }
            return done(null, user)
        } catch (error) {
            console.log(error)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userModel.findOne({_id:id})
        done(null, user)
    })

}

module.exports = {
    initPassport,
    initPassortGithub
}

