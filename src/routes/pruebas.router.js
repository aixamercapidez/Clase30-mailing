const {Router}   = require('express')
const { sendMail } = require('../utils/sendmail')
const { sendSms, sendWhatsapp } = require('../utils/sendsms')

const router = Router()


router.get('/sms', async (req, res) => {
     await sendSms()
   // await sendWhatsapp('Federico', 'Osandón')
    res.send('SMS enviado')
})


router.get('/mail', async (req, res) => {
    console.log(__dirname)
    let destino = 'aixamercapidez6450@gmail.com'
    let subject = 'Correo de prueba comsión 39750'
    let html = `<div>
        <h1>Esto es un test</h1>
    </div>`
    
    let result = await sendMail(destino, subject, html)
    res.send('Email enviado')
})



module.exports = router
