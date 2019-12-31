import React, { Component } from 'react'
// import Card from '../styled-components/Card'
import axios from 'axios'
import { Skeleton } from 'antd'


class EventDetailContainer extends Component {

    state = {}

    async componentDidMount() {
        const { id } = this.props.match.params
        const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=3c27oyAcQSIQNGPt7bzLXHgBy8ZIahhV`)
        this.setState({ event: { ...data } })
      }


  render() {
    const { event } = this.state
    if (!event) {
      return (
        <div className="App">
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="row detalle-evento-privado-div my-3 ">
            <div className="col-12 col-md-4">
            <img src={event.images[0].url} alt={event.name} className="evento-privado-img py-auto"  />
            </div>
            <div className="col-12 col-md-6 text-white">
              <h2 className="text-center">
                {event.name} 
              </h2>
              <div className="py-3">
                <p>
                  <b>Fecha:</b>{event.dates.start.dateTime}
                </p>
                <p>
                  <b>Horario:</b>{event.dates.start.localTime}
                </p>
                <p>
                  <b>Descripción:</b>{event.info}
                </p>
              </div>
            </div>
          </div>
        </div>

        </div>

    )
  }
}

export default EventDetailContainer