import React, { Component } from 'react'
import api from '../../api'
import { Row, Col, Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap'

class Matches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      champData: null
    }
  }
  componentDidMount() {
    api.icon()
      .then(champs =>
        this.setState({
          champData: champs
        })
      )
  }
  getChampionIcon(key) {
    const match = this.props.matchesDetails[key]
    const playerId = this.props.getId(this.props.summoner.name, match)
    const playerInfo = match.participants.find(player => player.participantId === playerId)
    const champName = Object.keys(this.state.champData).filter(champName => {
      return this.state.champData[champName].key === playerInfo.championId.toString()
    })
    const champImage = this.state.champData[champName[0]].image.full
    return 'https://ddragon.leagueoflegends.com/cdn/8.13.1/img/champion/' + champImage
  }
  render() {
    const matchHistoryList =
      this.props.matchesResults.map((result, i) => (
        <Col key={i} className="pr-0">
          <Card inverse className="rounded">
            <CardImg src={this.getChampionIcon(i)}/>
            <CardImgOverlay className="d-flex align-items-center justify-content-center">
              <CardTitle>{result}</CardTitle>
            </CardImgOverlay>
          </Card>
        </Col>
      ))
    return (
      <Col>
        <Row className="h-100 justify-content-between">
          {matchHistoryList}
        </Row>
      </Col>
    )
  }
}

export default Matches
