import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Skeleton, Row, Col } from 'antd'
import { Link} from 'react-router-dom'



class Matchcard extends Component {
  state = {
    matches: []
  }

  async componentDidMount()  {

    const { data } = await MY_SERVICE.getMatches()

    this.setState({ matches: [...data.match] })

  }
  async componentWillReceiveProps(){

    const { data } = await MY_SERVICE.getMatches()

    this.setState({ matches: [...data.match] })

  }
  render() {
    const { matches } = this.state

    if (!matches) {

      return (
        <div className="App">
        <h1>hola</h1>
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    }else if (matches === []) {
     
      return (

        <div className="App">
        <h1>hola</h1>
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    }
    else{
      return (
        <Row>
        <Col className="row">
          {matches.map(({ 
            matchName,
        dateTime,
        localTime,
        direction,
        image,
           _id }
           ) => (
       <div key={`${_id}`}  className="eventos-div">
       <div>
       <img src={`${image}`} className="eventImage"alt={`${matchName}`} />
       </div>
       <div>
       <div>
      <Link className="event-button" exact to={`/match/${_id}`} type="button" >{matchName}</Link>
     </div>
       <div id="content">
       <p>Fecha:{dateTime}</p>
     <p>Direction:{direction}</p>
     <p>Hora:{localTime}</p>
       </div>
       </div>
       </div>
            ))}
           </Col>
        </Row>
           )

    }
    
 };
       }
  export default Matchcard




