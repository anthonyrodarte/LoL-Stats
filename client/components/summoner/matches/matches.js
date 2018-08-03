import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class Matches extends Component {
  render() {
    const matchHistoryList =
      this.props.results.map((result, i) => (
        <Col key={i}>
          <div className="bg-dark h-100 d-flex align-items-center justify-content-center">
            <span className="text-light">{result}</span>
          </div>
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
