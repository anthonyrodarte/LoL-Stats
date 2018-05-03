const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const getSummoner = require('./get-summoner')
const getIcon = require('./get-icon')
const getRank = require('./get-rank')
const getMatchHistory = require('./get-match-history')
const getMatch = require('./get-match')

module.exports = function createApp() {
  const app = express()
  const jsonParser = bodyParser.json()
  const publicPath = path.join(__dirname, 'public')
  const staticMiddleware = express.static(publicPath)

  app.use(jsonParser)
  app.use(staticMiddleware)

  app.get('/search', (req, res, next) => {
    const name = req.query.name
    getSummoner(name, (err, summoner) => {
      if (err) return next(err)
      res.json(summoner)
    })
  })

  app.get('/rank', (req, res, next) => {
    const id = req.query.id
    getRank(id, (err, rank) => {
      if (err) return next(err)
      res.json(rank)
    })
  })

  app.get('/matches', (req, res, next) => {
    const id = req.query.id
    getMatchHistory(id, (err, matches) => {
      if (err) return next(err)
      res.json(matches)
    })
  })

  app.get('/match', (req, res, next) => {
    const id = req.query.id
    getMatch(id, (err, match) => {
      if (err) return next(err)
      res.json(match)
    })
  })

  app.get('/icon', (req, res, next) => {
    const id = req.query.id
    getIcon(id, (err, icon) => {
      if (err) return next(err)
      res.json(icon)
    })
  })

  app.use((err, req, res, next) => {
    res.sendStatus(500)
    console.error(err)
  })
  return app
}
