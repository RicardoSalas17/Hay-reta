import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Link, Redirect} from 'react-router-dom'
import { MyContext } from "../../context";
import { Skeleton,  Row, Col} from 'antd'

class Profiles extends Component {
    state = {
      
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const { data } = await MY_SERVICE.getotherUser(`/profile/${id}`)
        this.setState({ user: { ...data } })
      }

      async componentDidUpdate(){
        const { id } = this.props.match.params
        const { data } = await MY_SERVICE.getotherUser(`/profile/${id}`)
        this.setState({ user: { ...data } })
      }

      

  render(props) {

    const {user} = this.state
    if (!user) {
      console.log(user)
      return (
        <div className="App">
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    }
    return (
      <div className="profile-fondo">
 <MyContext.Consumer>
      {context => 
        {if (!context.loggedUser) {
          return <Redirect to="/login" />
         }
        else{
          return(
            <div>
            <div className="profile-fondo">
            <div className="container">
              <div className="row detalle-perfil-div">
                <div className="col-12 col-md-5">
                  <img
                    src={`${user.image}`}
                    alt="Foto de perfil"
                  />
                </div>
                <div className="col-12 col-md-7">
                  <h2 className="text-center mt-2 mt-md-5">
      
                    <b> {user.name} {}</b>{" "}
                  </h2>
                  <h3 className="pt-4">{user.email} </h3>
                </div>
              </div>
              <div>
                <div className="text-center p-3 p-md-5">
                  <h2 className="titulo-mis-eventos">TEAMS</h2>
                </div>



                <div>

                <Row>
    
                <Col span={12} className="text-center p-3 p-md-5">
                <h2 className="titulo-mis-eventos">TEAMS</h2>


                {
                  user.teams.map(({ 
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
                      
                    <b>Team Name:</b> {name} 
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
                        <h3>
                        {players._id = context.user._id ? 
                          <Link className="event-button" exact to={`/profile`} type="button" > {name}</Link>
                          :
                          <Link className="event-button" exact to={`/profiles/${_id}`} type="button" > {name}</Link>
                        }
                       
                        </h3>
                        </div>
                      )) : <div className="App">
                      <Skeleton avatar paragraph={{ rows: 4 }} />
                      </div> 
                    }
                    </div>
                    <div className="text-center mt-2">
                      <Link className="event-button" exact to={`/team/${_id}`} type="button" >Detail</Link>
                    </div>
                  </div>
                  </div>
                  ))}
                  </Col>

                  <Col  span={12} className="text-center p-3 p-md-5">
                  <h2 className="titulo-mis-eventos">MATCHES</h2>
                    {
                      user.matchs.map(({ 
                        matchName, 
                     image,
                     _id,
                     players,
                     matchType,
                     teams,
                     dateTime,
                     localTime,
                     description,
                    } ) => (
                    <div key={`${_id}`} className="row detalle-evento-privado-div my-3 ">
                      <div className="col-12 col-md-4">
                        <img
                          src={`${image}`}
                          alt={`${matchName}`}
                          className="evento-privado-img py-auto"
                        />
                       
                      </div>
                      <div className="col-12 col-md-6 text-white">
                        <h2 className="text-center">
                          
                        <div className="text-center mt-2">
                        <Link className="event-button" exact to={`/match/${_id}`} type="button" >{matchName}</Link>
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
                      </Col>
              </Row>
              </div>
              </div>
            </div>
          </div>
           </div>
          )}
        }
        
        }   
    </MyContext.Consumer>
  </div>
  );}

          
        
    
  }


export default Profiles

