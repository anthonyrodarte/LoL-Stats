import React from 'react'

export default function SummonerStats(props) {
  const summoner = props.summoner
  return (
    <div>
      <p>Summoner Name: {summoner.summonerName}</p>
      <p>
        Summoner Level:
        {summoner.summonerLevel}
      </p>
    </div>
  )
}
