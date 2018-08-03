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
          <Col className='pr-0' >
            <span className="text-muted">{`Rank: ${first}${rest
              .join('')
              .toLowerCase()}`}
            </span>
            <img src={`../../images/${tier.toLowerCase()}.png`} className="img-fluid w-25 ml-2"/>
          </Col>
        </Row>
      )
    }

    return <span>Rank: Unranked</span>
  }
}

export default Rank
