import React from 'react'
import Search from './search'
import Summoner from './summoner'
import api from './api'
import { Container, Row, Col } from 'reactstrap'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      summoner: null,
      invalidSearch: null
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.reset = this.reset.bind(this)
  }
  handleSearch() {
    this.setState({
      invalidSearch: null
    })
    if (!this.state.input) {
      this.setState({
        invalidSearch: 'Please enter a summoner name.'
      })
      return
    }
    api.search(this.state.input)
      .then(summoner => {
        if (!summoner) {
          this.setState({
            invalidSearch: 'Summoner not found.'
          })
          return
        }
        this.setState({
          summoner: summoner
        })
      })
  }
  reset() {
    this.setState({
      input: '',
      summoner: null,
      invalidSearch: null
    })
  }
  handleInput(event) {
    this.setState({ input: event.target.value })
  }
  renderErrorMsg(message) {
    if (!message) {
      return null
    }
    return (
      <div className="my-5 alert alert-danger" role="alert">
        {message}
      </div>
    )
  }
  renderStats() {
    const stats = (
      <Summoner summoner={this.state.summoner} reset={this.reset} />
    )
    return stats
  }
  render() {
    const {summoner, invalidSearch} = this.state

    if (summoner) {
      return <div>{this.renderStats()}</div>
    }
    return (
      <Container className='h-100'>
        <Row className='h-25'/>
        <Row>
          <Col className='text-center'>
            <h1 className='text-light display-3'>LoL Stats</h1>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col />
          <Col xs='5'>
            <Search input={this.handleInput} click={this.handleSearch} />
            {this.renderErrorMsg(invalidSearch)}
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}
