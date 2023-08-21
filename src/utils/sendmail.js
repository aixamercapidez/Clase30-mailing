const nodemailer = require('nodemailer')
//const config     = require('../config/objetConfig')
require('dotenv').config()
let gmail_user_app=process.env.gmail_user_app
let gmail_pass_app=process.env.gmail_pass_app
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: gmail_user_app,
        pass: gmail_pass_app
    }
})

const sendMail = async (destino, subject, html)=>{
    return await transport.sendMail({
        from: 'aixamercapidez6450@gmail.com',
        // to: 'projectodigitalgen@gmail.com',
        to: destino,
        // subject: 'Correo de prueba comsión 39750',
        subject,
        html,
        attachments: [] 
        // html:`<div>
        //     <h1>Esto es un test</h1>
        // </div>`,
        // attachments: [{
        //     filename:'nodejs.png',
        //     path: __dirname + '/nodejs.png',
        //     cid:'nodejs'
        // }]
    })
}
module.exports = sendMail