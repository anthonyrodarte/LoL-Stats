import React, { Component } from 'react'
import Icon from './icon'
import Name from './name'
import Rank from './rank'
import { Col, Row } from 'reactstrap'

class SummonerInfo extends Component {
  render() {
    return (
      <Col xs="4">
        <Row className="align-items-center">
          <Col xs="2" className="pr-0">
            <Icon icon={this.props.icon} />
          </Col>
          <Col xs="9" >
            <Name name={this.props.summoner.name} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Rank rank={this.props.rank}/>
          </Col>
        </Row>
      </Col>
    )
  }
}

// <Rank rank={this.props.rank} />

export default SummonerInfo
