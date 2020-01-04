import React from 'react'
import { MyContext } from '../../context'
import Matchcard from './MatchCards'

export default class matchContainer extends React.Component {


  render() {

    return (
        <MyContext.Consumer>
        {context => (
          <div className="backgroundEvents">
          <div className="container">
          <Matchcard />
          </div>
          </div>
      )}
    </MyContext.Consumer>
  )}
}
