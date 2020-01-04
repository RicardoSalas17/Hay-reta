import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import {
  Button
} from 'reactstrap';


class Matchcard extends Component {
  state = {
    matches: []
  }

  async componentDidMount()  {

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
        <div>
        <div className="row">
          {matches.map(({ 
            matchName,
        dateTime,
        localTime,
        description,
        direction,
        image,
           _id }
           ) => (
       <div key={`${_id}`}  className="d-flex flex-row  w-100 eventos-div">
       <div  className="w-25">
       <img src={`${image}`} className="eventImage"alt={`${matchName}`} />
       </div>
       <div className="w-75 ">
       <h2 className="text-center p-2">{matchName}</h2>
       <p>Fecha:{dateTime}</p>
       <p>Hora:{localTime}</p>
       <p>Descripción:{description}</p>
       <div className="text-center">
       <Button > 
       <Link exact to={`/matchs/${_id}`} type="button" >Detail</Link>
      </Button>
      <Button > 
      <Link exact to={`/matchs/${_id}`} type="button" >Edit event</Link>
     </Button>
       </div>
       </div>
       </div>
            ))}
           </div>
        </div>
           )

    }
    
 };
       }
  export default Matchcard




