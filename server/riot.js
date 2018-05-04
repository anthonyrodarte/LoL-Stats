const request = require('request')

const baseUrl = 'https://na1.api.riotgames.com'

const apiKeyURL = '?api_key=' + process.env.API_KEY

const riot = {
  getIcon(id, callback) {
    const getIconUrl = '/lol/static-data/v3/profile-icons'
    const url = baseUrl + getIconUrl + apiKeyURL
    request(url, { json: true }, (err, response, body) => {
      if (err) return callback(err)
      const icon = body.data[id]
      callback(null, icon)
    })
  },
  getMatchHistory(id, callback) {
    const getMatchHistoryUrl = '/lol/match/v3/matchlists/by-account/'
    const url = baseUrl + getMatchHistoryUrl + id + apiKeyURL
    request(url, { json: true }, (err, response, body) => {
      if (err) return callback(err)
      callback(null, body)
    })
  },
  getMatch(id, callback) {
    const getMatchUrl = '/lol/match/v3/matches/'
    const url = baseUrl + getMatchUrl + id + apiKeyURL
    request(url, { json: true }, (err, response, body) => {
      if (err) return callback(err)
      callback(null, body)
    })
  },
  getRank(id, callback) {
    const getRankUrl = '/lol/league/v3/positions/by-summoner/'
    const url = baseUrl + getRankUrl + id + apiKeyURL
    request(url, { json: true }, (err, response, body) => {
      if (err) return callback(err)
      callback(null, body)
    })
  },
  getSummoner(name, callback) {
    const getSummonerUrl = '/lol/summoner/v3/summoners/by-name/'
    const url = baseUrl + getSummonerUrl + name + apiKeyURL
    request(url, { json: true }, (err, response, body) => {
      if (err) return callback(err)
      callback(null, body)
    })
  }
}

module.exports = riot
