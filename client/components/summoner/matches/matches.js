import React, { Component } from 'react'
import api from '../../api'
import { Row, Col, Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap'

class Matches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchesDetails: [],
      matchesResults: []
    }
  }
  componentDidMount() {
    api.matches(this.props.summoner.accountId)
      .then(matchesJSON =>
        this.setState({
          matchesDetails: matchesJSON,
          matchesResults: this.getMatchResults(this.props.summoner.name, matchesJSON)
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
    const matchHistoryList =
      this.state.matchesResults.map((result, i) => (
        <Col key={i} className="pr-0">
          <Card inverse className="rounded">
            <CardImg width="100%" src="../../../images/zed.jpeg"/>
            <CardImgOverlay className="d-flex align-items-center justify-content-center">
              <CardTitle>{result}</CardTitle>
            </CardImgOverlay>
          </Card>
        </Col>
      ))
    return (
      <Col>
        <Row className="h-100 justify-content-between">
          {matchHistoryList}
        </Row>
      </Col>
    )
  }
}

export default Matches
