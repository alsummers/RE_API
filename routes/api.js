var express = require('express');
var router = express.Router()
var controllers = require('../controllers')

router.get('/users/all', controllers.users.getUsers)
router.post('/users/create', controllers.users.createUser)
router.delete('/users/remove', controllers.users.deleteUser)






module.exports = router