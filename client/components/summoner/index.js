import React from 'react'
import api from '../api'
import SummonerInfo from './info'
import Matches from './matches/matches'
import { Container, Row, Col } from 'reactstrap'

export default class Summoner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      rank: null,
      matchesDetails: [],
      matchesResults: []
    }
  }
  componentDidMount() {
    api.rank(this.props.summoner.id)
      .then(rank =>
        this.setState({
          rank: rank[0]
        })
      )
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
          <SummonerInfo icon={`http://ddragon.leagueoflegends.com/cdn/8.13.1/img/profileicon/${this.state.iconId}.png`} summoner={this.props.summoner} rank={this.state.rank} level={this.props.summoner.summonerLevel} />
          <Matches results={this.state.matchesResults} details={this.state.matchesDetails} summoner={this.props.summoner}/>
        </Row>
      </Container>
    )
  }
}
