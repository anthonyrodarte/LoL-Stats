import React from 'react'
import api from '../api'
import SummonerInfo from './info'
import Matches from './matches/matches'
import { Container, Row } from 'reactstrap'

export default class Summoner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconId: this.props.summoner.profileIconId,
      rank: null,
      matchesDetails: []
    }
  }

  componentDidMount() {
    api.rank(this.props.summoner.id)
      .then(rank =>
        this.setState({
          rank: rank[0]
        })
      )
    api.matches(this.props.summoner.accountId)
      .then(matchesJSON =>
        this.setState({
          matchesDetails: this.getMatchResults(this.props.summoner.name, matchesJSON)
        })
      )
  }
  getMatchResults(name, matches) {
    let matchResults = []
    for (let i = 0; i < matches.length; i++) {
      const identities = matches[i].participantIdentities
      const identity = identities.find(player => {
        return player.player.summonerName === name
      })
      const id = identity.participantId
      const playerStats = matches[i].participants.find(participant => {
        return participant.participantId === id
      })
      if (playerStats.stats.win) {
        matchResults.push('Win')
      }
      else {
        matchResults.push('Loss')
      }
    }
    return matchResults
  }
  render() {
    return (
      <Container>
        <Row>
          <SummonerInfo icon={`http://ddragon.leagueoflegends.com/cdn/8.13.1/img/profileicon/${this.state.iconId}.png`} summoner={this.props.summoner} rank={this.state.rank} level={this.props.summoner.summonerLevel} />
          <Matches results={this.state.matchesDetails}/>
        </Row>
      </Container>
    )
  }
}

// const profileIconURL = 'http://ddragon.leagueoflegends.com/cdn/8.13.1/img/profileicon/' + this.state.iconId + '.png'
// const {rank, matchesDetails} = this.state
// const summoner = this.props.summoner
// const rankTitle = (
//   <p className="lead">
//     { rank ? 'Rank: ' + rank.tier : 'Unranked'}
//   </p>
// )
// const icon = (
//   <img
//     src={profileIconURL}
//     className="img-thumbnail"
//   />
// )
// const rankIconURL = rank
//   ? '../../images/' + rank.tier.toLowerCase() + '.png'
//   : ''
// const rankIcon = (
//   <img src={rankIconURL} className="img-fluid" />
// )
// const matchHistoryList =
//   matchesDetails.map((result, i) => (
//     <ListGroup key={i} className="row mx-5">
//       <ListGroupItem color="secondary" className="my-1 text-center">{result}</ListGroupItem>
//     </ListGroup>
//   ))

// (
//   <Container>
//     <Row className="d-flex align-items-center mb-2">
//       <Col>
//         <img
//           src="../../images/logo.png"
//           style={{ width: 200 }}
//           onClick={this.props.reset}
//         />
//       </Col>
//     </Row>
//     <Row className="d-flex align-items-center">
//       <Col xs="2" className="my-1">
//         {icon}
//       </Col>
//       <Col>
//         <div className="col text-dark text-center">
//           <h2 className="mb-3 display-4">{summoner.name}</h2>
//           {rankTitle}
//           <p>Summoner Level: {summoner.summonerLevel}</p>
//         </div>
//       </Col>
//       <Col xs="2">
//         <div className="float-right">
//           {rankIcon}
//         </div>
//       </Col>
//     </Row>
//     <Row className="my-5"/>
//     <Row>
//       <Col>
//         {matchHistoryList}
//       </Col>
//     </Row>
//   </Container>
// )

//
// <div className="row">
//   <div className="col text-light text-center">
//     <h2 className="mb-3 display-4">{summoner.name}</h2>
//     {rankTitle}
//     <p>Summoner Level: {summoner.summonerLevel}</p>
//   </div>
// </div>

// <div className="container">
//   <img
//     src="../../images/logo.png"
//     style={{ width: 200 }}
//     onClick={this.props.reset}
//   />
//   <Row className="bg-dark">
//     <div className="col" style={{ marginTop: 25 }}>
//       {icon}
//       {rankIcon}
//       <div className="row">
//         <div className="col text-light text-center">
//           <h2 className="mb-3 display-4">{summoner.name}</h2>
//           {rankTitle}
//           <p>Summoner Level: {summoner.summonerLevel}</p>
//         </div>
//       </div>
//     </div>
//   </Row>
// </div>
// <div className="container text-center">
//   <p className="h3">Recent Matches</p>
//   <hr/>
//   {matchHistoryList}
// </div>
