import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: ['Zed', 'Akali', 'Jax', 'Janna', 'Nunu', 'Diana', 'Fizz', 'Blitzcrank', 'Swain', 'Nasus'],
        datasets: [
          {
            label: 'Damage',
            data: [
              10000,
              12323,
              50000,
              5000,
              1000,
              30212,
              43242,
              0,
              21312,
              20000

            ],
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
  render() {
    return (
      <div className="chart">
        <HorizontalBar
          data={this.state.chartData}
          options={{}}
        />
      </div>
    )
  }
}

export default Chart
