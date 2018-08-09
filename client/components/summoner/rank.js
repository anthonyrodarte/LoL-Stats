import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class Rank extends Component {
  render() {
    if (this.props.rank) {
      const tier = this.props.rank.tier
      const tierSplit = tier.split('')
      const [first, ...rest] = tierSplit

      return (
        <Row className="align-items-center">
          <Col xs='3' className='pr-0'>
            <img src={`../../images/${tier.toLowerCase()}.png`} className="img-fluid"/>
          </Col>
          <Col xs='9' >
            <span className="text-muted">{`Rank: ${first}${rest
              .join('')
              .toLowerCase()}`}
            </span>
          </Col>
        </Row>
      )
    }

    return (
      <Row className="align-items-center">
        <Col xs='12' >
          <span className="text-muted">Rank: Unranked
          </span>
        </Col>
      </Row>
    )
  }
}

export default Rank
