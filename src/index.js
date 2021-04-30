const express = require('express')
const server = express()
const cors = require('cors')
server.use(express.json())

const UsersRoutes = require('./routes/user')
server.use(cors())
server.use('/', UsersRoutes)

server.listen(3333, () => {
  console.log("API ONLINE!")
})