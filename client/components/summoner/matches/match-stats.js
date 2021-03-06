import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import Chart from '../../Chart'

class MatchStats extends Component {
  render() {
    const matchInfo = this.props.details[this.props.match]
    if (matchInfo) {
      const time = matchInfo.gameDuration
      const id = this.props.getId(this.props.summoner.name, matchInfo)
      const playerStats = matchInfo.participants[id - 1].stats
      const creepScore = playerStats.totalMinionsKilled + playerStats.neutralMinionsKilled
      return (
        <Col className='bg-light mx-2'>
          <Row className='py-3'>
            <Col xs="4">
              <Row>
                <Col>
                  <h4>{this.props.results[0]}
                    <small className="text-muted"> ( {Math.floor(time / 60)}m {time % 60}s )</small>
                  </h4>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs="3">
                  <p className='mb-1'>Kills:</p>
                  <p className='mb-1'>Deaths:</p>
                  <p className='mb-1'>Assists:</p>
                  <p className='mb-1'>Gold:</p>
                  <p className='mb-1'>Creeps:</p>
                </Col>
                <Col xs="9">
                  <p className='mb-1'>{playerStats.kills}</p>
                  <p className='mb-1'>{playerStats.deaths}</p>
                  <p className='mb-1'>{playerStats.assists}</p>
                  <p className='mb-1'>{playerStats.goldEarned}</p>
                  <p className='mb-1'>{creepScore}</p>
                </Col>
              </Row>
            </Col>
            <Col xs="8">
              <Row>
                <Col>
                  <h5>Damage by Summoner</h5>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Chart matchInfo={matchInfo} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      )
    }
    else {
      return (
        <Col className='bg-light mx-2 text-center'>
          <h4>Loading Stats</h4>
        </Col>
      )
    }
  }
}

export default MatchStats
