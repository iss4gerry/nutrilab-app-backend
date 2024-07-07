const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerOption = require('./config/swaggerOption')
const errorHandler = require('./middlewares/error')
const router = require('./routes/index')
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerSpec = swaggerJSDoc(swaggerOption)
const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use('*', cors())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
}));

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(router)
app.use(errorHandler)

module.exports = app
