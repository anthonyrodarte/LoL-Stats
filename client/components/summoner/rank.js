import React, { Component } from 'react'

class Rank extends Component {
  render() {
    if (this.props.rank) {
      const tier = this.props.rank.tier
      const tierSplit = tier.split('')
      const [first, ...rest] = tierSplit

      return (
        <div>
          <span className="text-muted">{`Rank: ${first}${rest
            .join('')
            .toLowerCase()}`}
          </span>
          <img src={`../../images/${tier.toLowerCase()}.png`} className="img-fluid"/>
        </div>
      )
    }

    return <span>Rank: Unranked</span>
  }
}

export default Rank
