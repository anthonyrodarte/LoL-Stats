import React from 'react'

export default class SummonerStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      icon: null
    }
  }
  componentDidMount() {
    fetch('/icon?id=' + this.state.iconId)
      .then(res => res.json())
      .then(icon =>
        this.setState({
          icon: icon
        })
      )
  }
  render() {
    const url = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/'
    const icon = this.state.icon ? (
      <img
        src={url + this.state.icon.image.full}
        className="border-dark img-thumbnail float-left"
        style={{ width: 150, height: 150 }}
      />
    ) : (
      <div />
    )
    const summoner = this.props.summoner
    return (
      <div className="my-5 container">
        <div className="row">
          <div className="col-sm">{icon}</div>
          <div className="col-sm">
            <h1 className="mb-3">{summoner.name}</h1>
            <p>Summoner Level: {summoner.summonerLevel}</p>
          </div>
          <div className="col-sm" />
        </div>
      </div>
    )
  }
}
