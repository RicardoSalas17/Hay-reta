import React from "react";
import { MyContext } from "../../context";
import { Link, Redirect} from 'react-router-dom'
import { Skeleton, Button, Row, Col} from 'antd'
export default function ProfileContainer() {
  return (
    <MyContext.Consumer>
      {context =>
        <div>
        <div className="profile-fondo" type="flex" justify="space-around" align="middle">

        <Row className="detalle-perfil-div" type="flex" justify="space-around" align="middle">
        <Col sm={12} md={12}  lg={10} >
        <img
        src={`${context.user.image}`}
        alt="Foto de perfil"
      />
        </Col>
        <Col sm={12} md={12} lg={14} align="middle" >
        <h2 >
        <b> {context.user.name} {}</b>{" "}
              </h2>
              <h3 >{context.user.email} </h3>
              <Link className="event-button" exact to={`/editprofile/${context.user._id}`} >
                  Edit profile
                </Link>

                <Button 
                onClick={e => {
                  context.deletUser(`/profile/${context.user._id}`);
                  return <Redirect to="/login" />
                }}
                className="event-buttondelete" exact to={`/`} >
                  Delete Profile
                </Button>
        </Col>
   
      </Row>,



       
      





              <div>
              <Row type="flex" justify="space-around" align="top">
              <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
              <h2 className="titulo-mis-eventos">MY TEAMS</h2>
            {!context.user.teams ? 
              <div className="App">
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                  </div> 
              :
              context.user.teams.map(({ 
              name, 
             image,
             _id,
             players
            } ) => (
            <div key={`${_id}`} className=" detalle-evento-privado-div  ">
              <div >
                <img
                  src={`${image}`}
                  alt={`${name}`}
                  className="evento-privado-img "
                />
              </div>
              <div>
                <h2 >
                <div >
                <Link className="event-button" exact to={`/team/${_id}`} type="button" >{name}</Link>
              </div>
                </h2>
                <div >
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
            </Col>
            <Col  xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} >
            <h2 className="titulo-mis-eventos">MY MATCHES</h2>
              {!context.user.matchs ? 
                <div className="App">
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                    </div> 
                :
                context.user.matchs.map(({ 
                  matchName, 
               image,
               _id,
               players
              } ) => (
              <div key={`${_id}`} className=" detalle-evento-privado-div ">
                <div >
                  <img
                    src={`${image}`}
                    alt={`${matchName}`}
                    className="evento-privado-img "
                  /> 
                </div>
                <div >
                  <h2 >
                  <div >
                  <Link className="event-button" exact to={`/match/${_id}`} type="button" >{matchName}</Link>
                </div>
                  </h2>
                  <div >
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
                </Col>
                </Row>
          </div>

      </div>
       </div>
      
              }
              </MyContext.Consumer> 
              )}  

