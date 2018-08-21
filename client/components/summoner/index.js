import React from 'react'
import api from '../api'
import SummonerInfo from './info'
import Matches from './matches/matches'
import MatchStats from './matches/match-stats'
import { Container, Row, Col } from 'reactstrap'

export default class Summoner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      rank: null,
      matchesDetails: [],
      matchesResults: [],
      selectedMatch: 0
    }
    this.updateSelectedMatch = this.updateSelectedMatch.bind(this)
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
          matchesDetails: matchesJSON,
          matchesResults: this.getMatchResults(this.props.summoner.name, matchesJSON)
        })
      )
  }
  getPlayerId(name, match) {
    const identities = match.participantIdentities
    const identity = identities.find(player => {
      return player.player.summonerName === name
    })
    const id = identity.participantId
    return id
  }
  getMatchResults(name, matches) {
    let matchResults = []
    for (let i = 0; i < matches.length; i++) {
      const id = this.getPlayerId(this.props.summoner.name, matches[i])
      const playerStats = matches[i].participants.find(participant => {
        return participant.participantId === id
      })
      if (playerStats.stats.win) {
        matchResults.push('Won')
      }
      else {
        matchResults.push('Lost')
      }
    }
    return matchResults
  }
  updateSelectedMatch(matchIndex) {
    this.setState({
      selectedMatch: matchIndex
    })
  }
  render() {
    return (
      <Container className="p-3">
        <Row>
          <Col>
            <h4 className="text-light" onClick={this.props.reset}>LoL Stats</h4>
          </Col>
        </Row>
        <Row className="bg-light p-3">
          <SummonerInfo icon={`http://ddragon.leagueoflegends.com/cdn/8.16.1/img/profileicon/${this.state.iconId}.png`} summoner={this.props.summoner} rank={this.state.rank} level={this.props.summoner.summonerLevel} />
          <Matches results={this.state.matchesResults} details={this.state.matchesDetails} summoner={this.props.summoner} getId={this.getPlayerId} updateMatch={this.updateSelectedMatch}/>
        </Row>
        <Row className="mt-4">
          <MatchStats details={this.state.matchesDetails} results={this.state.matchesResults} match={this.state.selectedMatch} getStats={this.getMatchStats} getId={this.getPlayerId} summoner={this.props.summoner} chartData={this.state.chartData}/>
        </Row>
      </Container>
    )
  }
}
