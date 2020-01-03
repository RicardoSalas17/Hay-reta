import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { Link, Redirect} from 'react-router-dom'
import { MyContext } from "../../context";
import { Skeleton } from 'antd'

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
      console.log(team)
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
          <div className="container">
            <div className="row">
              <div className="row detalle-perfil-div">
                <div className="col-12 col-md-4">
                <img src={`${team.image}`} className="evento-privado-img py-auto" alt={`${team.name}`} />
                </div>
                
                <div className="col-12 col-md-6 text-white">
                  <h2 className="text-center">
                    
                  <b>Team Name:</b> {team.name} 
                  </h2>
                  <div className="py-3">
                    <p>
                      <b>Players:</b>
                    </p>
                    {team.players.map(({ 
                     _id,
                     name
                    } ) => (
                      <div key={`${_id}`}>
                      <h3>
                      {name}
                      </h3>
                      </div>
                    )) }
                  </div>
                  </div>
                </div>
                <div>
                <div className="text-center p-3 p-md-5">
                  <h2 className="titulo-mis-eventos">MATCHES</h2>
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


export default TeamDetail

