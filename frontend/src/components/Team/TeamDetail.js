import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Link, Redirect} from 'react-router-dom'
import { MyContext } from "../../context";
import { Skeleton,Button, Row, Col } from 'antd'

class TeamDetail extends Component {
    state = {
      
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const { data } = await MY_SERVICE.getTeam(`/team/${id}`)
        this.setState({ team: { ...data } })
      }

      async componentDidUpdate(){
        const { id } = this.props.match.params
        const { data } = await MY_SERVICE.getTeam(`/team/${id}`)
        this.setState({ team: { ...data } })
      }

      inputChange = ({ target: {value, name} }) =>{
        this.setState({
          ...this.state,
          formComment:{
            ...this.state.formEvent,
            [name]:value
          }
        });
      };

      

  render(props) {

    const { team } = this.state
    if (!team) {
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
           
          <div >
     <div type="flex" justify="space-around" align="middle">
 
          <Row className="detalle-perfil-div" type="flex" justify="space-around" align="middle">
          <Col span={12}><img src={`${team.image}`} className="evento-privado-img " alt={`${team.name}`} /></Col>
          <Col span={12}>
          <h2 className="text-center">
                    
          <b>Team Name:</b> {team.name} 
          </h2>
          <div >
            <p>
              <b>Players:</b>
            </p>
            {team.players ? 
              team.players.map(({ 
             _id,
             name
            } ) => (
              <div key={`${_id}`}>
              <h3>
              {name}
              </h3>
              </div>
            )) : (
              <div className="App">
              <Skeleton avatar paragraph={{ rows: 4 }} />
              </div>
            ) }
          </div>
          <Link className="event-button" exact to={`/editteams/${team._id}`} >
        Edit team
      </Link>

      {team.owner._id === context.user._id ? 
      <Button 
      onClick={e => {
        context.deleteTeam(`/team/${team._id}`);
        return <Redirect exact to="/profile"/>
      }}
      className="event-buttondelete"  >
        Delete Team
      </Button>: <div></div>
    }

          </Col>
        </Row>

        </div>


        <h2 className="titulo-mis-eventos">MATCHES</h2>


        <div>
        {!team.matchs ? 
          <div className="App">
              <Skeleton avatar paragraph={{ rows: 4 }} />
              </div> 
          :
          team.matchs.map(({ 
            matchName, 
         image,
         _id,
         players
        } ) => (


        <Row key={`${_id}`} className="detalle-evento-privado-div " type="flex" justify="space-around" align="middle">
          <Col sm={12} md={10} >
            <img
              src={`${image}`}
              alt={`${matchName}`}
              className="evento-privado-img "
            /> 
          </Col>
          <Col sm={12} md={12} >
            <h2 >
            <div>
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
          </Col>
          </Row>
          ))}
          </div>


          </div>
    
          )}

        }
        
        }
        
    

    </MyContext.Consumer>

  </div>
  );}

          
        
    
  }


export default TeamDetail