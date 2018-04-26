const request = require('request')

const getIconUrl =
  'https://na1.api.riotgames.com/lol/static-data/v3/profile-icons'

const apiKeyURL = '?api_key=' + process.env.API_KEY

function getIcon(id, callback) {
  const url = getIconUrl + apiKeyURL
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return callback(err)
    }
    const icon = body.data[id]
    callback(null, icon)
  })
}

module.exports = getIcon
