import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'

const ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=MX&apikey=3c27oyAcQSIQNGPt7bzLXHgBy8ZIahhV'

class EventTicketContainer extends Component {
  state = {
    events: []
  }

  async componentDidMount() {
    const { data } = await axios.get(ENDPOINT)
    this.setState({ events: [...data._embedded.events] })

  }

  render() {
    const { events } = this.state
    return (
      <div className="App">
      <div className="container">

      <div className="row">
          {events.map(event => (
            <div className="d-flex flex-row  w-100 eventos-div" key={event.id} >
            <div className="w-25 h-100 align-items-center">
            <img src={event.images[0].url} alt={event.name} className="w-100 my-auto"/>
            </div>
            <div className="w-75 m-2 m-md-4">
            <h2 className="text-center p-2">{event.name}</h2>
            <h4 className="text-center"> Organizado por ticket master </h4>
            <p>Fecha:{event.dates.localDate}</p>
            <p>Hora:{event.dates.localTime}</p>
            <p>{event.dates.localDate}</p>
            <p>{event.dates.localTime}</p>
            <p>Descripción:</p>
            <p>{event.info}</p>
            <div className="d-flex flex-row justify-content-between">

            <Button > 
<Link exact to={`/events-tm/${event.id}`} type="button" >Detail</Link>
</Button>
            <a href={event.url}>Comprar boletos</a>
            </div>
           
            </div>
            </div>

            ))}
       
        </div>
      </div>
      </div>
    )
  }
}

export default EventTicketContainer