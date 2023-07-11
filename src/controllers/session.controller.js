class SessionController {
    login = async (req, res) => {
        if (!req.user) return res.status(401).send({ status: 'error', message: 'invalid credential' })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email


        }
        res.send({ status: 'success', message: 'user register' })
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

    logout = (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.send({ status: 'error', error: err })
            }
            res.redirect('http://localhost:8080/login')
        })
    }

    current = (req, res) => {
        const { first_name } = req.session.user
        const { last_name } = req.session.user
        const { email } = req.session.user

        const { role } = req.session.user
        res.send({
            first_name,
            last_name,
            email,
            role,
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

}

module.exports= new SessionController()