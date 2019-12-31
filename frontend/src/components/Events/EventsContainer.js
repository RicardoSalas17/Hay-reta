import React from 'react'
import { MyContext } from '../../context'
// import EventCard from "./EventCards";
import EventsCard from './EventCards';
// import { Redirect } from 'react-router';

export default class upContainer extends React.Component {


  render() {

    return (
        
        <MyContext.Consumer>
        
        {context => (
            
        
        
          <div className="backgroundEvents">
          <div className="container">
        

          <EventsCard/>
          </div>          </div>
       
      )}
    </MyContext.Consumer>
  )}
}
