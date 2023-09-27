const express = require('express')
const {connectDb} = require('./config/configServer.js')
const routerServer = require('./routes')
const logger = require('morgan')
const viewsRouter = require('./routes/views.router')
const session = require('express-session')

const { initPassport, initPassortGithub } = require('./config/passport.config.js')
const passport = require('passport')

const cookieParser = require('cookie-parser')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')


 
const app = express()
const PORT = process.env.PORT || 8080

const FileStore  = require('session-file-store')
const {create} = require('connect-mongo') 
app.use(cookieParser('P@l@braS3cr3t0'))

require('dotenv').config()
let url = process.env.MONGO_URL
let secret= process.env.SECRET
app.use(session({
    store: create({
        mongoUrl: url,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 1000000*6000
    }),
    secret:secret,
    resave: false,
    saveUninitialized: false
})) 


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de adoptame',
            description: 'Esta es la documentación de adoptame'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

initPassport()
initPassortGithub()
passport.use(passport.initialize())
passport.use(passport.session())
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static',express.static(__dirname+'/public'))
app.use(logger('dev'))


app.use(routerServer)

//----------------

const { Server } = require('socket.io')




//-----------



const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})



const io = new Server(httpServer)
// hbs __________________________________________________________________
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// hbs __________________________________________
app.use('/', viewsRouter)




app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})
