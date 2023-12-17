const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
require('dotenv').config()

const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/user')
const recommendedFoodsRouter = require("./routes/api/recommended-food")

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const options = {
  definition: {
    openapi: "3.0.0",
    info:{
      title: "Healthy hub rest api",
      version: "1.0.0",
    },
    servers: [
      {
        url: 'https://healthy-hub-rest-api.onrender.com/'
      }
    ]
  },
  apis: ['routes/swagger.js']
}
swaggerSpec = swaggerJSDoc(options)
app.use(logger(formatsLogger))
app.use(cors({origin: '*'}))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', usersRouter)
app.use('/api/recommended-food', recommendedFoodsRouter)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
})

module.exports = app