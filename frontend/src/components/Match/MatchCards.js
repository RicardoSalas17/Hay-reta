import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Skeleton } from 'antd'
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
       <div className="text-center mt-2">
       <Link className="event-button" exact to={`/match/${_id}`} type="button" >{matchName}</Link>
     </div>
       <div className="text-center" id="content">
       <p>Fecha:{dateTime}</p>
     <p>Direction:{direction}</p>
     <p>Hora:{localTime}</p>
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




