import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap'

class Matches extends Component {
  render() {
    console.log(this.props)
    const matchHistoryList =
      this.props.results.map((result, i) => (
        <Col key={i} className="pr-0">
          <Card inverse className="rounded">
            <CardImg width="100%" src="../../../images/zed.jpeg"/>
            <CardImgOverlay className="d-flex align-items-center justify-content-center">
              <CardTitle>{result}</CardTitle>
            </CardImgOverlay>
          </Card>
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
