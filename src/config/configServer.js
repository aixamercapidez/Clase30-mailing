const {connect} = require('mongoose')
require('dotenv').config()
let url = process.env.MONGO_URL
module.exports = {
    connectDb: ()=>{
        connect(url)
        console.log('Base de datos conectada')
    }
}