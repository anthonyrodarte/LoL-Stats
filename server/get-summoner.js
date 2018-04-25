const request = require('request')

const baseUrl =
  'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'

function getSummoner(name, callback) {
  const url = baseUrl + name + '?api_key=' + process.env.API_KEY
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    callback(null, body)
  })
}

module.exports = getSummoner
