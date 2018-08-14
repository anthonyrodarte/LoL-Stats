import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'

class MatchStats extends Component {
  render() {
    console.log(this.props)
    return (
      <Col className='bg-light mx-2 border border-dark'>
        <Row className='py-3'>
          <Col xs="5">
            <Row>
              <Col>
                <h4>{this.props.Results[0]}
                  <small className="text-muted"> ( 24m 00s )</small>
                </h4>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs="3">
                <p>Kills:</p>
                <p>Deaths:</p>
                <p>Assists:</p>
                <p>Gold:</p>
                <p>Creeps:</p>
              </Col>
              <Col xs="9">
                <p>18</p>
                <p>0</p>
                <p>0</p>
                <p>120001</p>
                <p>234</p>
              </Col>
            </Row>
          </Col>
          <Col xs="7">
            <h5>Damage by Champion</h5>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default MatchStats
