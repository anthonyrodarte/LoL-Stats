import React, { Component } from 'react'
import { Col } from 'reactstrap'

class Name extends Component {
  render() {
    return <h3 className="m-0">{this.props.name}</h3>
  }
}

export default Name
