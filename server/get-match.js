const request = require('request')

const baseUrl = 'https://na1.api.riotgames.com'

const getMatchUrl = '/lol/match/v3/matches/'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getMatch(id, callback) {
  const url = baseUrl + getMatchUrl + id + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

module.exports = getMatch
