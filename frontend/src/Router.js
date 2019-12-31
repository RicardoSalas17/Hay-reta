import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import Navbar from './components/styled-components/Navbar'
import SignupContainer from './components/Signup/SignupContainer'
import LoginContainer from './components/Login/LoginContainer'
import upContainer from './components/Events/EventsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import EventTicketContainer from './components/Events/EventTicketMaster';
import EventDetailContainer from './components/Events/EventDetailContainer';
import AddEvent from './components/Events/AddEvent';
import EventDetail from './components/Events/EventDetail';
import Editevent from './components/Events/Editevent';
import EditUser from './components/Profile/Edituser';
import AddTeam from './components/Team/AddTeam';




const Router = () => (
  <BrowserRouter>
  <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignupContainer} />
      <Route exact path="/login"  component={LoginContainer} />
      <Route exact path="/events" component={upContainer} />
      <Route exact path="/events/:id" component={EventDetail} />
      <Route exact path="/addevents" component={AddEvent} />
      <Route exact path="/addteam" component={AddTeam} />
      <Route exact path="/editevents/:id" component={Editevent} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route exact path="/editprofile/:id" component={EditUser} />
      <Route exact path="/events-tm" component={EventTicketContainer} />
      <Route exact path="/events-tm/:id" component={EventDetailContainer} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
