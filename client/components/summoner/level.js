import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class Level extends Component {
  render() {
    return (
      <Row className="h-100 align-items-center">
        <Col className="pl-0">
          <span className="text-muted">Level: {this.props.level}
          </span>
        </Col>
      </Row>
    )
  }
}

export default Level
