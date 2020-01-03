import React from 'react'
import { MyContext } from '../../context'
// import EventCard from "./EventCards";
import TeamsCard from './TeamsCards';
// import { Redirect } from 'react-router';

export default class Teams extends React.Component {


  render() {

    return (
        
        <MyContext.Consumer>
        
        {context => (
            
        
        
          <div className="backgroundEvents">
          <div className="container">
          <TeamsCard/>
          </div>    
          </div>
       
      )}
    </MyContext.Consumer>
  )}
}
