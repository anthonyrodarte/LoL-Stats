import React from 'react'

export default class Search extends React.Component {
  render() {
    return (
      <div className="input-group mt-5">
        <input type="text" className="form-control" placeholder="Summoner" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Button
          </button>
        </div>
      </div>
    )
  }
}
