import React from 'react'

export default class SummonerStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      icon: 1,
      rank: null
    }
  }
  componentDidMount() {
    fetch('/rank?id=' + this.props.summoner.id)
      .then(res => res.json())
      .then(rank =>
        this.setState({
          rank: rank[0]
        })
      )
  }
  render() {
    const icon = (
      <img
        src="../../images/testicon.png"
        className="border border-light float-left"
        style={{ width: 150 }}
      />
    )
    const rankIconURL = this.state.rank
      ? '../../images/' + this.state.rank.tier + '.png'
      : ''

    const rankIcon = (
      <img src={rankIconURL} className="float-right" style={{ width: 150 }} />
    )

    const summoner = this.props.summoner
    return (
      <div>
        <div className="container">
          <img
            src="../../images/logo.png"
            className="mb-2"
            style={{ width: 200 }}
          />
          <div
            className="row border border-dark"
            style={{
              height: '200px',
              backgroundImage: 'url(../../images/banner.jpg)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          >
            <div className="col" style={{ marginTop: 25 }}>
              {icon}
              {rankIcon}
              <div className="row">
                <div className="col-1" />
                <div className="col text-light text-center">
                  <h2 className="mb-3 display-4">{summoner.name}</h2>
                  <p className="lead">Rank: Gold</p>
                  <p>Summoner Level: {summoner.summonerLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 150 }} />
        <div className="container text-center">
          <h6>Recent Matches</h6>
          <div className="row win border border-dark mx-5 my-1">
            <p className="my-0 mx-auto">win</p>
          </div>
          <div className="row loss border border-dark mx-5 my-1">
            <p className="my-0 mx-auto">loss</p>
          </div>
          <div className="row win border border-dark mx-5 my-1">
            <p className="my-0 mx-auto">win</p>
          </div>
          <div className="row loss border border-dark mx-5 my-1">
            <p className="my-0 mx-auto">loss</p>
          </div>
          <div className="row win border border-dark mx-5 my-1">
            <p className="my-0 mx-auto">win</p>
          </div>
        </div>
      </div>
    )
  }
}
