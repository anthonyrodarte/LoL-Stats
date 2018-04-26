const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const getSummoner = require('./get-summoner')

module.exports = function createApp() {
  const app = express()
  const jsonParser = bodyParser.json()
  const publicPath = path.join(__dirname, 'public')
  const staticMiddleware = express.static(publicPath)

  app.use(jsonParser)
  app.use(staticMiddleware)

  app.get('/search', (req, res) => {
    const name = req.query.name
    getSummoner(name, (err, summoner) => {
      if (err) {
        res.sendStatus(500)
        console.error(err)
        return err
      }
      res.json(summoner)
    })
  })

  return app
}