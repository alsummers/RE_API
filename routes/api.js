var express = require('express');
var router = express.Router()
var controllers = require('../controllers')

router.get('/users/all', controllers.users.getUsers)
router.post('/signup', controllers.users.signup)
router.post('/login', controllers.users.login)
router.delete('/users/remove', controllers.users.deleteUser)






module.exports = router