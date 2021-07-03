const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const dotenv = require('dotenv')
const routerNavigation = require('./routes/index')

const app = express()
const port = process.env.DATABASE_PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())
app.options('*', cors())
dotenv.config({ path: '../.env' })

app.use('/backend1/api/v1', routerNavigation)
app.use('/backend1/api', express.static('src/uploads'))

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})
