var express = require('express');
var router = express.Router()
var controllers = require('../controllers')
var auth = require('../middleware/auth')

router.get('/users/all', controllers.users.getUsers)
router.get('/user/:id', controllers.users.getUserValues)
router.post('/signup', controllers.users.signup)
router.post('/login', controllers.users.login)
router.delete('/users/:id', auth, controllers.users.deleteUser)

router.post('/donation', controllers.donations.createDonation)






module.exports = router