import React from 'react'
import SummonerInfo from './info'
import Matches from './matches/matches'
import MatchStats from './matches/match-stats'
import { Container, Row, Col } from 'reactstrap'
import Search from '../search'

export default class Summoner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      selectedMatch: 0
    }
    this.updateSelectedMatch = this.updateSelectedMatch.bind(this)
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
          <Col className="d-flex align-items-center">
            <h4 className="text-light m-0" onClick={this.props.reset}>LoL Stats</h4>
          </Col>
          <Col>
            <Search input={this.props.input} click={this.props.click}/>
          </Col>
        </Row>
        <Row className="bg-light p-3 mt-3">
          <SummonerInfo icon={`https://ddragon.leagueoflegends.com/cdn/8.16.1/img/profileicon/${this.state.iconId}.png`} summoner={this.props.summoner} rank={this.state.rank} level={this.props.summoner.summonerLevel} />
          <Matches results={this.props.results} details={this.props.details} summoner={this.props.summoner} getId={this.props.getId} updateMatch={this.updateSelectedMatch} match={this.state.selectedMatch}/>
        </Row>
        <Row className="mt-4">
          <MatchStats details={this.props.details} results={this.props.results} match={this.state.selectedMatch} getId={this.props.getId} summoner={this.props.summoner}/>
        </Row>
      </Container>
    )
  }
}
