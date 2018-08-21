import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: this.props.matchInfo.participantIdentities.map(summoner => summoner.player.summonerName),
        datasets: [
          {
            data: this.props.matchInfo.participants.map(player => player.stats.totalDamageDealtToChampions),
            backgroundColor: [
              '#3991ef',
              '#5383e8',
              '#3892f0',
              '#00b2ff',
              '#3594f1',
              '#3991ef',
              '#5383e8',
              '#3892f0',
              '#00b2ff',
              '#3594f1'
            ]
          }
        ]
      }
    }
  }
  componentDidUpdate(oldProps) {
    if (oldProps !== this.props) {
      this.setState({
        chartData: {
          labels: this.props.matchInfo.participantIdentities.map(summoner => summoner.player.summonerName),
          datasets: [
            {
              data: this.props.matchInfo.participants.map(player => player.stats.totalDamageDealtToChampions)
            }
          ]
        }
      })
    }
  }
  render() {
    return (
      <div className="chart">
        <HorizontalBar
          data={this.state.chartData}
          options={{
            legend: {
              display: false
            }
          }}
        />
      </div>
    )
  }
}

export default Chart
