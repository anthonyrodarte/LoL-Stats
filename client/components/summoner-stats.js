import React from 'react'

export default class SummonerStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      icon: 1
    }
  }
  render() {
    const icon = this.state.icon ? (
      <img
        src="../../images/testicon.png"
        className="border-dark img-thumbnail float-left"
        style={{ width: 150 }}
      />
    ) : (
      <div />
    )
    const summoner = this.props.summoner
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            {icon}
            <div className="row">
              <div className="col-1" />
              <div className="col">
                <h2 className="mb-3 ">{summoner.name}</h2>
                <p>Summoner Level: {summoner.summonerLevel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
