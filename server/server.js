require('dotenv').config()
const express = require('express')
const app = express()
const errorHandler = require('./middlewares/error')
const cors = require('cors')

// cors settings if you need
const corsOptions = {
  origin: [
    `http://${process.env.HOST_ADDRESS}:8080`,
    `http://${process.env.HOST_ADDRESS}:3000`,
    `http://${process.env.HOST_ADDRESS}:3001`,
    `http://${process.env.HOST_ADDRESS}:4000`,
    `http://${process.env.HOST_ADDRESS}:5000`,
    `http://${process.env.HOST_ADDRESS}:5173`
  ]
}

app.use(cors(corsOptions))

app.use(express.static('public'))

// db config
require('./config/db')

// reponses jsons correctly
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// route files
app.use(process.env.API_PREFIX, require('./routes'))

// error handler middleware
app.use(errorHandler)

// app will listen this port
app.listen(process.env.API_PORT || 80, () => console.log('Server is started'))
