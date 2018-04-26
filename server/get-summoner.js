const request = require('request')

const getSummonerUrl =
  'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getSummoner(name, callback) {
  const url = getSummonerUrl + name + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

module.exports = getSummoner
