import React from 'react'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      summoner: null,
      foundSummoner: null,
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
          foundSummoner: summoner.name,
          summonerLevel: summoner.summonerLevel
        })
      )
  }
  handleInput(event) {
    this.setState({ summoner: event.target.value })
  }
  render() {
    return (
      <div>
        <div className="input-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Summoner"
            onInput={this.handleInput}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleClick}
            >
              Search
            </button>
          </div>
        </div>
        <ul>
          <li>Summoner Name: {this.state.foundSummoner}</li>
          <li>Summoner Level: {this.state.summonerLevel}</li>
        </ul>
      </div>
    )
  }
}
