import React, { Component } from 'react'

class Icon extends Component {
  render() {
    return <img src={this.props.icon} className="img-fluid"/>
  }
}

export default Icon
