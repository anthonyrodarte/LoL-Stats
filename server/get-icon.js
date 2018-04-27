const request = require('request')

const baseUrl = 'https://na1.api.riotgames.com'

const getIconUrl = '/lol/static-data/v3/profile-icons'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getIcon(id, callback) {
  const url = baseUrl + getIconUrl + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    const icon = body.data[id]
    callback(null, icon)
  })
}

module.exports = getIcon
