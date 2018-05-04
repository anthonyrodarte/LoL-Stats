const api = {
  search(name) {
    return fetch('/search?name=' + name)
      .then(res => res.json())
      .then(summoner => {
        if (summoner.status) {
          return null
        }
        return summoner
      })
  },
  rank(id) {
    return fetch('/rank?id=' + id)
      .then(res => res.json())
      .then(rank => {
        return rank
      })
  },
  matches(id) {
    return fetch('/matches?id=' + id)
      .then(res => res.json())
      .then(matchList => {
        const recentMatches = matchList.matches.slice(0, 5)
        return recentMatches
      })
      .then(recentMatches => {
        return Promise.all(
          recentMatches.map(match => {
            return fetch('/match?id=' + match.gameId)
              .then(res => res.json())
          })
        )
      })
  }
}

export default api
