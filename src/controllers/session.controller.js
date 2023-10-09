const {userModel} = require('../dao/mongo/model/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const { UserService } = require("../service/index");//
const sendMail = require('../utils/sendmail')
class SessionController {
    login = async (req, res) => {
        
        if (!req.user) return res.status(401).send({ status: 'error', message: 'invalid credential' })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email


        }
        const email= req.session.user.email
        let user1 = await userModel.findOne({email})
        let userID = user1._id.toString()
        const last_connection = {
            last_connection: new Date().toLocaleString('es-MX')
        }
        const user2 = await UserService.updateUser(userID, last_connection)
        //res.send({ status: 'success', message: 'user register' })
        res.redirect('/home')
    }

    failurelogin = (req, res) => {
        console.log("register failure")
        res.send({ status: 'error' })
    }
    register = async (req, res) => {
        res.send({ status: 'succes', message: 'user created' })
    }

    failure = (req, res) => {
        console.log("register failure")
        res.send({ status: 'error' })
    }

    logout = async(req, res) => {
        const email= req.session.user.email
        let user1 = await userModel.findOne({email})
        let userID = user1._id.toString()
        const last_connection = {
            last_connection: new Date().toLocaleString('es-MX')
        }
        const user = await UserService.updateUser(userID, last_connection)
        req.session.destroy(err => {
            if (err) {
                return res.send({ status: 'error', error: err })
            }
            res.redirect('/login')
        })
    }

    current =  async(req, res) => {
        const { first_name } = req.session.user
        const { last_name } = req.session.user
        const { email } = req.session.user
        let userDB = await userModel.findOne({email})
        let cartId = userDB.cartID
        const { role } = req.session.user
        res.send({
            first_name,
            last_name,
            email,
            role,
            cartId,
        })
    }

    counter = (req, res) => {
        if (req.session.counter) {
            req.session.counter++
            res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
        } else {
            req.session.counter = 1
            res.send('Bienvenido')
        }
    }

    privada = (req, res) => {

        res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
    }

    restore = async (req, res) => {
        try {
            
            const { body: { email } } = req

            let user = await userModel.findOne({email})
            
            const useremail = user.email
            let userID = user._id.toString()
            
            if (!useremail) throw new Error("Can't find the user")

         

            const URL = `/api/session/restore/${userID}`

            const html = `
                <center>
                    <p>
                        Se ah solicitado un cambio de contraseña
                    </p>
                    <p>
                        Ingrese al siguiente enlace para cambiar su contraseña: <a>${URL}</a>
                        <h6>Este enlace tiene una fecha de expiración de 1hr</h6>
                    </p>
                    <p>
                        Si usted no mandó un correo para cambiar la contraseña, por favor envíe un email
                    </p>
                </center>
            `
            
            sendMail(useremail, "Change Password", html)
            
            res.send("Mail enviado correctamente")
            console.log("mail enviado")
        } catch (error) {
            console.log("error")
        }
    }

    newPass = async (req, res) => {
        try {
            const {UID} = req.params
            const { body: { password } } = req
            console.log(UID)
            console.log(password)
           
         let user= await userModel.findById(UID).lean()
           const email=user.email
           const hashedPassword = user.password
           console.log(hashedPassword)

            const validPassword = isValidPassword(password, user)
            
            if (validPassword) throw new Error("Passwords are equal")

            const newPassword = createHash(password)
            
            await UserService.changePassword({ email, newPassword })

            res.send("Se cambió la contraseña")
            console.log("Se cambió la contraseña")
        } catch (error) {
            console.log("error")
        }
    }

    updateRol = async (req, res, next) => {
        try {
            const { params: { UID } } = req
           
            const { nonSensitiveUser } = await await userModel.findById(UID).lean() ?? {}

            if (!nonSensitiveUser) {
                throw new Error("User doesn't exists")
            }

            

            nonSensitiveUser.role == "user" ? nonSensitiveUser.role = "premium" : nonSensitiveUser.role === "premium" ? nonSensitiveUser.role = "user" : null
            const newRole = await UserService.updateUser(UID, nonSensitiveUser)

            res.status(200).sendSuccess(newRole)
        } catch (error) {
            next(error)
        }
    }

}

module.exports= SessionController