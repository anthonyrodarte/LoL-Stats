import React from 'react'
import Search from './search'
import SummonerStats from './summoner-stats'
import api from './api'

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
      <SummonerStats summoner={this.state.summoner} reset={this.reset} />
    )
    return stats
  }
  render() {
    const {summoner, invalidSearch} = this.state

    if (summoner) {
      return <div>{this.renderStats()}</div>
    }
    return (
      <div className="container-fluid h-100">
        <div className="row h-25" />
        <div className="row">
          <div className="col-4" />
          <div className="col-4 text-center">
            <img src="../../images/logo.png" className="img-fluid" />
          </div>
          <div className="col-4" />
        </div>
        <div className="row my-5">
          <div className="col-4" />
          <div className="col-4">
            <Search input={this.handleInput} click={this.handleSearch} />
            {this.renderErrorMsg(invalidSearch)}
          </div>
          <div className="col-4" />
        </div>
        <div className="row my-5">
          <div className="col-4" />
          <div className="col-4" />
        </div>
      </div>
    )
  }
}
