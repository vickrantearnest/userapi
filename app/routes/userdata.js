const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');
router.post('/userdetails', userController.userData);
router.post('/userdetailsValidate', userController.userDataValidation);
module.exports = router;