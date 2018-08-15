import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import Chart from '../../Chart'

class MatchStats extends Component {
  render() {
    return (
      <Col className='bg-light mx-2 border border-dark'>
        <Row className='py-3'>
          <Col xs="4">
            <Row>
              <Col>
                <h4>{this.props.Results[0]}
                  <small className="text-muted"> ( 24m 00s )</small>
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
                <p className='mb-1'>18</p>
                <p className='mb-1'>0</p>
                <p className='mb-1'>0</p>
                <p className='mb-1'>120001</p>
                <p className='mb-1'>234</p>
              </Col>
            </Row>
          </Col>
          <Col xs="8">
            <Row>
              <Col>
                <h5>Damage by Champion</h5>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Chart />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default MatchStats
