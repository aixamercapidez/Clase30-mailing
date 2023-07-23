const {Router} =require('express')
const router = Router()
const LoggerController = require('../controllers/logger.controller')
const loggerController = new LoggerController()


router.get('/fatal',  loggerController.fatal)
router.get('/error',  loggerController.error)
router.get('/warning',  loggerController.warning)
router.get('/info',  loggerController.info)
router.get('/http',  loggerController.http)
router.get('/debug', loggerController.debug)
    

module.exports = router