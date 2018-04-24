import React from 'react'
import Logo from './logo'
import Search from './search'

export default class App extends React.Component {
  render() {
    return (
      <div className="h-50 d-flex align-content-center">
        <div className="col-4 mx-auto my-auto">
          <Logo />
          <Search />
        </div>
      </div>
    )
  }
}
