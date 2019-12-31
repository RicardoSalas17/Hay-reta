import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Link } from 'react-router-dom'
// import Card from '../styled-components/Card'
import { Skeleton } from 'antd'
import {
  Button
} from 'reactstrap';


class EventsCard extends Component {
  state = {
    events: []
  }

  async componentDidMount()  {
    const { data } = await MY_SERVICE.getEvents()
    this.setState({ events: [...data.events] })
    
  }
  async componentDidUpdate()  {
    const { data } = await MY_SERVICE.getEvents()
    this.setState({ events: [...data.events] })
    
  }

  render() {
    const { events } = this.state

    if (!events) {
      return (
        <div className="App">
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    }
  return (
  
    <>
    <div className="row ">
      {events.map(({ 
        eventName, 
        dateTime,
        localTime,
       description,
       owner,
       comments,
       image,
       _id }
       ) => (

   <div key={`${_id}`}  className="d-flex flex-row  w-100 eventos-div">
   <div  className="w-25">
   <img src={`${image}`} className="eventImage"alt={`${eventName}`} />
   </div>
   <div className="w-75 ">
   <h2 className="text-center p-2">{eventName}</h2>
   <h4 className="text-center"> Organizador: {owner.name} </h4>
   <p>Fecha:{dateTime}</p>
   <p>Hora:{localTime}</p>
   <p>Descripción:{description}</p>
   <div className="text-center">
   <Button > 
   <Link exact to={`/events/${_id}`} type="button" >Detail</Link>
  </Button>
  
  <Button > 
  <Link exact to={`/editevents/${_id}`} type="button" >Edit event</Link>
 </Button>
   </div>
  
   </div>
   </div>
        ))}
       </div>

    </>

       )};

       }
  export default EventsCard




