const request = require('request')

const baseUrl = 'https://na1.api.riotgames.com'

const getRankUrl = '/lol/league/v3/positions/by-summoner/'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getRank(id, callback) {
  const url = baseUrl + getRankUrl + id + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

module.exports = getRank
