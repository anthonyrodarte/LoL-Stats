import React from 'react'
import Search from './search'
import SummonerStats from './summoner-stats'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      summoner: null
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.reset = this.reset.bind(this)
  }
  handleSearch() {
    fetch('/search?name=' + this.state.input)
      .then(res => res.json())
      .then(summoner =>
        this.setState({
          summoner: summoner
        })
      )
  }
  reset() {
    this.setState({
      input: '',
      summoner: null
    })
  }
  handleInput(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    const stats = (
      <SummonerStats summoner={this.state.summoner} reset={this.reset} />
    )
    return !this.state.summoner ? (
      <div className="container-fluid h-100">
        <div className="row h-25" />
        <div className="row">
          <div className="col-4" />
          <div className="col-4 text-center">
            <img src="../../images/logo.png" />
          </div>
          <div className="col-4" />
        </div>
        <div className="row my-5">
          <div className="col-4" />
          <div className="col-4">
            <Search input={this.handleInput} click={this.handleSearch} />
          </div>
          <div className="col-4" />
        </div>
      </div>
    ) : (
      <div>{stats}</div>
    )
  }
}
