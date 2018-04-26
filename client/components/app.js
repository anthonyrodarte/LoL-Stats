import React from 'react'
import Logo from './logo'
import Search from './search'
import SummonerStats from './summoner-stats'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      summoner: null,
      summonerName: null,
      summonerLevel: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  handleClick() {
    fetch('/search?name=' + this.state.summoner)
      .then(res => res.json())
      .then(summoner =>
        this.setState({
          summonerName: summoner.name,
          summonerLevel: summoner.summonerLevel
        })
      )
  }
  handleInput(event) {
    this.setState({ summoner: event.target.value })
  }
  render() {
    const stats = this.state.summonerName ? (
      <SummonerStats summoner={this.state} />
    ) : (
      <div />
    )
    return (
      <div className="h-50 d-flex align-content-center">
        <div className="col-4 mx-auto my-auto">
          <Logo />
          <Search input={this.handleInput} click={this.handleClick} />
          {stats}
        </div>
      </div>
    )
  }
}
