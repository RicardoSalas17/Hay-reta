import React from "react";
import { MyContext } from "../../context";
import { Link, Redirect} from 'react-router-dom'
import { Skeleton, Button} from 'antd'
export default function ProfileContainer() {


  return (
    <MyContext.Consumer>

      {context =>
        {
          if (!context.loggedUser) {
           return <Redirect to="/login" />
          }
          
          else if(!context.user.teams ){
          context.handleUser()
          return (<div className="App">
          <Skeleton avatar paragraph={{ rows: 4 }} />
          </div>)
        } 
        else{
        return(
      <div>
      <div className="profile-fondo">
      <div className="container">
        <div className="row detalle-perfil-div">
          <div className="col-12 col-md-5">
            <img
              src={`${context.user.image}`}
              alt="Foto de perfil"
            />
          </div>
          <div className="col-12 col-md-7">
            <h2 className="text-center mt-2 mt-md-5">

              <b> {context.user.name} {}</b>{" "}
            </h2>
            <h3 className="pt-4">{context.user.email} </h3>
            <div className="text-center mt-2 mt-md-5">
              <Link className="event-button" exact to={`/editprofile/${context.user._id}`} >
                Edit profile
              </Link>
            </div>

            <div className="text-center mt-2 mt-md-5">
              <Button 
              onClick={e => {
                context.deletUser(`/profile/${context.user._id}`);
                return <Redirect to="/login" />
              }}
              className="event-button" exact to={`/profile/${context.user._id}`} >
                Delete Profile
              </Button>
            </div>

          </div>
        </div>
        <div>
          <div className="text-center p-3 p-md-5">
            <h2 className="titulo-mis-eventos">MY TEAMS</h2>
          </div>
          {
            context.user.teams.map(({ 
            name, 
           image,
           _id,
           players
          } ) => (
          <div key={`${_id}`} className="row detalle-evento-privado-div my-3 ">
            <div className="col-12 col-md-4">
              <img
                src={`${image}`}
                alt={`${name}`}
                className="evento-privado-img py-auto"
              />
            </div>
            <div className="col-12 col-md-6 text-white">
              <h2 className="text-center">
                
              <div className="text-center mt-2">
              <Link className="event-button" exact to={`/team/${_id}`} type="button" >{name}</Link>
            </div>
              </h2>
              <div className="py-3">
                <p>
                  <b>Players:</b>
                </p>
                
                {players ? players.map((
                  { 
                 _id,
                 name
                } ) => 
                (
                  <div key={`${_id}`}>
                  <div>
                  {_id === context.user._id ? 
                    <h3> {name}</h3>
                    :
                    <Link className="event-button" exact to={`/profiles/${_id}`} type="button" > {name}</Link>
                  }
                  </div>
                  </div>
                )) : <div className="App">
                <Skeleton avatar paragraph={{ rows: 4 }} />
                </div> 
              }
              </div>
              
            </div>
            </div>
            ))}
        </div>
      </div>
    </div>
     </div>
      )}}}


    </MyContext.Consumer>
  );}


