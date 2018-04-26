import React from 'react'

export default function Search(props) {
  return (
    <div>
      <div className="input-group mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Summoner"
          onInput={props.input}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={props.click}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
