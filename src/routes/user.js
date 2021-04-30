const express = require('express')
const routerUsers = express.Router()

const UsersController = require('../controller/user')

routerUsers.post('/create', UsersController.create)
routerUsers.get('/show/:id', UsersController.show)
routerUsers.put('/add/:id', UsersController.update)
routerUsers.post('/login', UsersController.login)
routerUsers.post('/forgot', UsersController.forgotPassword)
routerUsers.post('/delete/:id', UsersController.delete)


module.exports = routerUsers