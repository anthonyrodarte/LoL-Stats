import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class Level extends Component {
  render() {
    return (
      <Row className="h-100 align-items-center">
        <Col>
          <span className="text-muted">Level: {this.props.level}
          </span>
        </Col>
      </Row>
    )
  }
}

export default Level
