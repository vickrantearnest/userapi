const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');
// router.post('/register', userController.create);
// router.get('/userdata', userController.userData);
router.post('/authenticate', userController.authenticate);
module.exports = router;