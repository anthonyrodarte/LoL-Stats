const request = require('request')

const baseUrl = 'https://na1.api.riotgames.com'

const getMatchHistoryUrl = '/lol/match/v3/matchlists/by-account/'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getMatchHistory(id, callback) {
  const url = baseUrl + getMatchHistoryUrl + id + '/recent' + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

module.exports = getMatchHistory
