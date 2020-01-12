import React from 'react'
import { MyContext } from '../../context'
import {  Row, Col} from "antd";
import Matchcard from './MatchCards'

export default class matchContainer extends React.Component {


  render() {

    return (
        <MyContext.Consumer>
        {context => (
          <Row type="flex" justify="space-around" align="middle" className= "match-cont fondoGris" 
        theme="dark">
          <Col>
          <Matchcard />
          </Col>
          </Row>
      )}
    </MyContext.Consumer>
  )}
}
