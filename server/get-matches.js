const request = require('request')

const baseUrl = 'https://na1.api.riotgames.com'

const getMatchesUrl = '/lol/match/v3/matchlists/by-account/'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getMatches(id, callback) {
  const url = baseUrl + getMatchesUrl + id + '/recent' + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

module.exports = getMatches
