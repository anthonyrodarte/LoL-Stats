import React from 'react'

export default class SummonerStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      icon: 1,
      rank: null,
      matches: null,
      matchesDetails: null
    }
    this.findPlayer = this.findPlayer.bind(this)
  }

  componentDidMount() {
    fetch('/rank?id=' + this.props.summoner.id)
      .then(res => res.json())
      .then(rank =>
        this.setState({
          rank: rank[0]
        })
      )
    fetch('/matches?id=' + this.props.summoner.accountId)
      .then(res => res.json())
      .then(matchList => {
        const recentMatches = matchList.matches.slice(0, 5)
        this.setState({
          matches: recentMatches
        })
        return recentMatches
      })
      .then(recentMatches => {
        return Promise.all(
          recentMatches.map(match => {
            return fetch('/match?id=' + match.gameId).then(res => res.json())
          })
        )
      })
      .then(matchesJSON =>
        this.setState({
          matchesDetails: matchesJSON
        })
      )
  }
  findPlayer(i) {
    const match = this.state.matchesDetails[i].participantIdentities

    const participant = match.find(players => {
      return players.player.summonerName === this.props.summoner.name
    })

    const participantList = this.state.matchesDetails[i].participants

    const findParticipant = participantList.find(player => {
      return player.participantId === participant.participantId
    })
    if (findParticipant.stats.win === true) {
      return 'Win'
    }
    else if (findParticipant.stats.win === false) return 'Loss'
    else {
      return 'Remake'
    }
  }
  render() {
    const summoner = this.props.summoner
    const icon = (
      <img
        src="../../images/testicon.png"
        className="border border-light float-left"
        style={{ width: 150 }}
      />
    )
    const rankIconURL = this.state.rank
      ? '../../images/' + this.state.rank.tier + '.png'
      : ''
    const rankIcon = (
      <img src={rankIconURL} className="float-right" style={{ width: 150 }} />
    )
    const matchHistoryList = this.state.matchesDetails ? (
      this.state.matchesDetails.map((match, i) => (
        <div key={i} className="row border border-dark mx-5 my-1">
          <p className="my-0 mx-auto">{this.findPlayer(i)}</p>
        </div>
      ))
    ) : (
      <div />
    )
    return (
      <div>
        <div className="container">
          <img
            src="../../images/logo.png"
            className="mb-2"
            style={{ width: 200 }}
            onClick={this.props.reset}
          />
          <div
            className="row border border-dark"
            onClick={this.findPlayer}
            style={{
              height: '200px',
              backgroundImage: 'url(../../images/banner.jpg)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          >
            <div className="col" style={{ marginTop: 25 }}>
              {icon}
              {rankIcon}
              <div className="row">
                <div className="col-1" />
                <div className="col text-light text-center">
                  <h2 className="mb-3 display-4">{summoner.name}</h2>
                  <p className="lead">Rank: Gold</p>
                  <p>Summoner Level: {summoner.summonerLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 150 }} />
        <div className="container text-center">
          <h6>Recent Matches</h6>
          {matchHistoryList}
        </div>
      </div>
    )
  }
}
