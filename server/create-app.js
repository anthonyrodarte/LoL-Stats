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

  app.get('/rank', (req, res) => {
    const id = req.query.id
    getRank(id, (err, rank) => {
      if (err) {
        res.sendStatus(500)
        console.error(err)
        return err
      }
      res.json(rank)
    })
  })

  app.get('/matches', (req, res) => {
    const id = req.query.id
    getMatchHistory(id, (err, matches) => {
      if (err) {
        res.sendStatus(500)
        console.error(err)
        return err
      }
      res.json(matches)
    })
  })

  app.get('/match', (req, res) => {
    const id = req.query.id
    getMatch(id, (err, match) => {
      if (err) {
        res.sendStatus(500)
        console.error(err)
        return err
      }
      res.json(match)
    })
  })

  app.get('/icon', (req, res) => {
    const id = req.query.id
    getIcon(id, (err, icon) => {
      if (err) {
        res.sendStatus(500)
        console.error(err)
        return err
      }
      res.json(icon)
    })
  })

  return app
}
