import React from 'react'
import Logo from './logo'
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
  handleInput(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    const stats = this.state.summoner ? (
      <SummonerStats summoner={this.state.summoner} />
    ) : (
      <div />
    )
    return (
      <div className="h-75 d-flex align-content-center">
        <div className="col-4 mx-auto my-auto">
          <Logo />
          <Search input={this.handleInput} click={this.handleSearch} />
          {stats}
        </div>
      </div>
    )
  }
}
