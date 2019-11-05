const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');
router.get('/userdata', userController.userData);
module.exports = router;