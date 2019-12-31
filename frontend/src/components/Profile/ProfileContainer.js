import React from "react";
import { MyContext } from "../../context";
import { Link } from 'react-router-dom'

export default function ProfileContainer() {


  return (
    <MyContext.Consumer>
    
      {context => (
        
        
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
              {" "}
              <b> {context.user.name} {}</b>{" "}
            </h2>
            <p className="pt-4">{context.user.email} {}</p>
            <div className="text-center mt-2 mt-md-5">
              <Link className="event-button" exact to={`/editprofile/${context.user._id}`} >
                Edit profile
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center p-3 p-md-5">
            <h2 className="titulo-mis-eventos">MY TEAMS</h2>
          </div>




        </div>
      </div>
    </div>
     </div>
      )}


    </MyContext.Consumer>
  );}


