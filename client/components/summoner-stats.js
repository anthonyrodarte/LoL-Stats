import React from 'react'
import api from './api'
import { Container, Row, Col } from 'reactstrap'


export default class SummonerStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      icon: 1,
      rank: null,
      matchesDetails: []
    }
  }

  componentDidMount() {
    api.rank(this.props.summoner.id)
      .then(rank =>
        this.setState({
          rank: rank[0]
        })
      )
    api.matches(this.props.summoner.accountId)
      .then(matchesJSON =>
        this.setState({
          matchesDetails: this.getMatchResults(this.props.summoner.name, matchesJSON)
        })
      )
  }
  getMatchResults(name, matches) {
    let matchResults = []
    for (let i = 0; i < matches.length; i++) {
      const identities = matches[i].participantIdentities
      const identity = identities.find(player => {
        return player.player.summonerName === name
      })
      const id = identity.participantId
      const playerStats = matches[i].participants.find(participant => {
        return participant.participantId === id
      })
      if (playerStats.stats.win) {
        matchResults.push('Win')
      }
      else {
        matchResults.push('Loss')
      }
    }
    return matchResults
  }
  render() {
    const profileIconURL = 'http://ddragon.leagueoflegends.com/cdn/8.13.1/img/profileicon/' + this.state.iconId + '.png'
    const {rank, matchesDetails} = this.state
    const summoner = this.props.summoner
    const rankTitle = (
      <p className="lead">
        { rank ? 'Rank: ' + rank.tier : 'Unranked'}
      </p>
    )
    const icon = (
      <img
        src={profileIconURL}
        className="border border-light float-left"
        style={{ width: 150 }}
      />
    )
    const rankIconURL = rank
      ? '../../images/' + rank.tier.toLowerCase() + '.png'
      : ''
    const rankIcon = rank ? (
      <img src={rankIconURL} className="float-right" style={{ width: 150 }} />
    ) : (
      <div className="float-right" style={{ width: 150, height: 150 }} />
    )
    const matchHistoryList =
      matchesDetails.map((result, i) => (
        <div key={i} className="row border border-dark mx-5 my-3 alert-secondary">
          <p className="my-0 mx-auto">{result}</p>
        </div>
      ))
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
                <div className="col text-light text-center">
                  <h2 className="mb-3 display-4">{summoner.name}</h2>
                  {rankTitle}
                  <p>Summoner Level: {summoner.summonerLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 150 }} />
        <div className="container text-center">
          <p className="h3">Recent Matches</p>
          <hr/>
          {matchHistoryList}
        </div>
      </div>
    )
  }
}
