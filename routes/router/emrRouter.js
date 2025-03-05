const express = require('express');
const emrcontroller = require('../../controller/emrcontroller');
const router = express.Router();

router.get('/getemr',emrcontroller.getEmr)
router.get('/getsubemr',emrcontroller.getSubEmr)
router.post('/credentials',emrcontroller.createCredentials)
router.get('/getcredentials', emrcontroller.getEmrCredentials);



module.exports = router