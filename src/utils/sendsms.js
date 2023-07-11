const twilio = require('twilio')
require('dotenv').config()

let twilio_sid          = process.env.twilio_sid
let twilio_atuh_token   = process.env.twilio_atuh_token
let twilio_phone_number = process.env.twilio_phone_number
let my_phone_number = process.env.my_phone_number

const cliente = twilio(twilio_sid,twilio_atuh_token) 

exports.sendSms = (nombre, apellido) => cliente.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from: twilio_phone_number,
    to:  my_phone_number
})
// exports.sendWhatsapp = (nombre, apellido) => cliente.messages.create({
//     body: `Gracias por tu compra ${nombre} ${apellido}`,
//     from: `whatsapp:+14155238886`,
//     to: `whatsapp:${my_phone_number}`
// })


