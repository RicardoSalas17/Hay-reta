import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import Navbar from './components/styled-components/Navbar'
import SignupContainer from './components/Signup/SignupContainer'
import LoginContainer from './components/Login/LoginContainer'
import ProfileContainer from './components/Profile/ProfileContainer';
import TeamDetail from './components/Team/TeamDetail';
import EditUser from './components/Profile/Edituser';
import AddTeam from './components/Team/AddTeam';
import Profiles from './components/Profile/OtherProfile';
import editTeams from './components/Team/EditTeam';
import matchContainer from './components/Match/MatchContainer';
import AddMatch from './components/Match/AddMatch';




const Router = () => (
  <BrowserRouter>
  <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignupContainer} />
      <Route exact path="/login"  component={LoginContainer} />
      <Route exact path="/matchs" component={matchContainer} />
      <Route exact path="/addmatchs" component={AddMatch} />
      <Route exact path="/team/:id" component={TeamDetail} />
      <Route exact path="/addteam" component={AddTeam} />
      <Route exact path="/editteams/:id" component={editTeams} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route exact path="/profiles/:id" component={Profiles} />
      <Route exact path="/editprofile/:id" component={EditUser} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
