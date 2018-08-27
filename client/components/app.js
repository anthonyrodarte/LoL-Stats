import React from 'react'
import Search from './search'
import Summoner from './summoner'
import api from './api'
import { Container, Row, Col } from 'reactstrap'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      summoner: null,
      invalidSearch: null,
      rank: null,
      matchesDetails: [],
      matchesResults: [],
      selectedMatch: 0
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.reset = this.reset.bind(this)
    this.updateSelectedMatch = this.updateSelectedMatch.bind(this)
  }
  handleSearch(e) {
    this.setState({
      invalidSearch: null
    })
    e.preventDefault()
    if (!this.state.input) {
      this.setState({
        invalidSearch: 'Please enter a summoner name.'
      })
      return
    }
    api.search(this.state.input)
      .then(summoner => {
        if (!summoner) {
          this.setState({
            invalidSearch: 'Summoner not found.'
          })
          return
        }
        this.setState({
          input: '',
          summoner: summoner,
          invalidSeach: null,
          matchesDetails: [],
          matchesResults: []
        })
        api.matches(summoner.accountId)
          .then(matchesJSON =>
            this.setState({
              matchesDetails: matchesJSON,
              matchesResults: this.getMatchResults(summoner.name, matchesJSON)
            })
          )
        api.rank(summoner.id)
          .then(rank =>
            this.setState({
              rank: rank[0]
            })
          )
      })
  }
  reset() {
    this.setState({
      input: '',
      summoner: null,
      invalidSearch: null
    })
  }
  updateSelectedMatch(matchIndex) {
    this.setState({
      selectedMatch: matchIndex
    })
  }
  getMatchResults(name, matches) {
    let matchResults = []
    for (let i = 0; i < matches.length; i++) {
      const id = this.getPlayerId(name, matches[i])
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
  getPlayerId(name, match) {
    const identities = match.participantIdentities
    const identity = identities.find(player => {
      return player.player.summonerName === name
    })
    const id = identity.participantId
    return id
  }
  handleInput(event) {
    this.setState({ input: event.target.value })
  }
  renderErrorMsg(message) {
    if (!message) {
      return null
    }
    return (
      <div className="my-5 alert alert-danger" role="alert">
        {message}
      </div>
    )
  }
  renderStats() {
    const stats = (
      <Summoner summoner={this.state.summoner} reset={this.reset} input={this.handleInput} click={this.handleSearch} details={this.state.matchesDetails} results={this.state.matchesResults} getId={this.getPlayerId} updateMatch={this.updateSelectedMatch} selectedMatch={this.state.selectedMatch} rank={this.state.rank}/>
    )
    return stats
  }
  render() {
    const {summoner, invalidSearch} = this.state

    if (summoner) {
      return <div>{this.renderStats()}</div>
    }
    return (
      <Container className='h-100'>
        <Row className='h-25'/>
        <Row>
          <Col className='text-center'>
            <h1 className='text-light display-3'>LoL Stats</h1>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col />
          <Col xs='5'>
            <Search input={this.handleInput} click={this.handleSearch} />
            {this.renderErrorMsg(invalidSearch)}
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}
