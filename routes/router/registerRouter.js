const express = require('express');
const userController = require('../../controller/userController');
const router = express.Router();

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/secretkey',userController.secretKey)
router.put('/forgotpassword',userController.forgotPassword)
router.put('/forgotsecretkey',userController.forgotSecretKey)


module.exports = router