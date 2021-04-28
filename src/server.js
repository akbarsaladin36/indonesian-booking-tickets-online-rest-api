const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const dotenv = require('dotenv')
const routerNavigation = require('./routes/index')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())
app.options('*', cors())
dotenv.config({ path: '../.env' })

app.use('/api/v1', routerNavigation)
app.use('/api', express.static('src/uploads'))

app.listen(5000, () => {
  console.log('Server is listening at port 5000.')
})
