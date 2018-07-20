const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const riot = require('./riot')

module.exports = function createApp() {
  const app = express()
  const jsonParser = bodyParser.json()
  const publicPath = path.join(__dirname, 'public')
  const staticMiddleware = express.static(publicPath)

  app.use(jsonParser)
  app.use(staticMiddleware)

  app.get('/search', (req, res, next) => {
    const name = req.query.name
    riot.getSummoner(name, (err, summoner) => {
      if (err) return next(err)
      res.json(summoner)
    })
  })

  app.get('/rank', (req, res, next) => {
    const id = req.query.id
    riot.getRank(id, (err, rank) => {
      if (err) return next(err)
      res.json(rank)
    })
  })

  app.get('/matches', (req, res, next) => {
    const id = req.query.id
    riot.getMatchHistory(id, (err, matches) => {
      if (err) return next(err)
      res.json(matches)
    })
  })

  app.get('/match', (req, res, next) => {
    const id = req.query.id
    riot.getMatch(id, (err, match) => {
      if (err) return next(err)
      res.json(match)
    })
  })

  app.use((err, req, res, next) => {
    res.sendStatus(500)
    console.error(err)
  })
  return app
}
