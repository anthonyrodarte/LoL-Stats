import React from 'react'
import SummonerInfo from './info'
import Matches from './matches/matches'
import MatchStats from './matches/match-stats'
import { Container, Row, Col } from 'reactstrap'
import Search from '../search'

export default class Summoner extends React.Component {

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
          <SummonerInfo icon={`https://ddragon.leagueoflegends.com/cdn/8.16.1/img/profileicon/${this.props.summoner.profileIconId}.png`} summoner={this.props.summoner} rank={this.props.rank} level={this.props.summoner.summonerLevel} />
          <Matches results={this.props.results} details={this.props.details} summoner={this.props.summoner} getId={this.props.getId} updateMatch={this.props.updateMatch} match={this.props.selectedMatch} champData={this.props.champData}/>
        </Row>
        <Row className="mt-4">
          <MatchStats details={this.props.details} results={this.props.results} match={this.props.selectedMatch} getId={this.props.getId} summoner={this.props.summoner}/>
        </Row>
      </Container>
    )
  }
}
