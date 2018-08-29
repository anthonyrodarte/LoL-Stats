import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap'

class Matches extends Component {
  getChampionIcon(key) {
    const match = this.props.details[key]
    const playerId = this.props.getId(this.props.summoner.name, match)
    const playerInfo = match.participants.find(player => player.participantId === playerId)
    const champName = Object.keys(this.props.champData).filter(champName => {
      return this.props.champData[champName].key === playerInfo.championId.toString()
    })
    const champImage = this.props.champData[champName[0]].image.full
    return 'https://ddragon.leagueoflegends.com/cdn/8.16.1/img/champion/' + champImage
  }
  render() {
    const matchHistoryList =
      this.props.results.map((result, i) => (
        this.props.match === i
          ? <Col key={i} className="pr-0" onClick={() => this.props.updateMatch(i)}>
            <Card inverse className="rounded">
              <CardImg src={this.getChampionIcon(i)} className="match"/>
              <CardImgOverlay className="d-flex align-items-center justify-content-center">
                <CardTitle>{result}</CardTitle>
              </CardImgOverlay>
            </Card>
          </Col>
          : <Col key={i} className="pr-0" onClick={() => this.props.updateMatch(i)}>
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
