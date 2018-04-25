require('dotenv/config')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(jsonParser)
app.use(staticMiddleware)

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
