import React, { Component } from 'react'
import MY_SERVICE from '../../services/index';
import { MyContext } from "../../context";
import { Form, Input, Button, Skeleton, Col, Row } from 'antd'
import { Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
'pk.eyJ1IjoiZGl1cml2aiIsImEiOiJjanAxdjA2cTQwMGp1M2tvYzZmZGp3bWc3In0.4cZEyLkU2ikqx_wb4A1z8A'

class MatchDetail extends Component {
    state = {
      formComment:{
        content: '',
        image:'',
        },
        lng: 5,
        lat: 34,
        zoom: 15
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        const { data } = await MY_SERVICE.getMatch(`/matchs/${id}`)
        this.setState({ match: { ...data } })
        const {  zoom } = this.state
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken
        })
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [data.lng, data.lat],
          zoom
        })
        map.addControl(geocoder)
        geocoder.on('result', (e) => {
          this.setState({
            formMatch:{
            lng: e.result.geometry.coordinates[0],
            lat: e.result.geometry.coordinates[1],
            direction:`${e.result.place_name}`
            }
          })
        })
      }
      async componentDidUpdate(){
        const { id } = this.props.match.params
        const { data } = await MY_SERVICE.getMatch(`/matchs/${id}`)
        this.setState({ match: { ...data } })
      }
      inputChange = ({ target: {value, name} }) =>{
        this.setState({
          ...this.state,
          formComment:{
            ...this.state.formMatch,
            [name]:value
          }
        });
      };
      handleComment = async e => {
        const { id } = this.props.match.params
        e.preventDefault();
        const { formComment } = this.state;      
        await MY_SERVICE.createComment(`/comments/${id}`,formComment)
        Swal.fire(`Coment created`, 'success')
        this.setState({ 
          formComment:{
            content: '',
            image:'',
            }
        })
      };
  render(props) {
    const { match } = this.state
    if (!match) {
      return (
        <div className="App">
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    }
    return (
      <div className="signup match-cont">
 <MyContext.Consumer>
      {context => (
      <div >
      <div >
        <div >
          <div className="detalle-evento-privado-div ">
            <div>
            <img src={`${match.image}`} className="evento-privado-img " alt={`${match.matchName}`} />
            </div>
            <div className="text-white">
              <h2 >
                {match.matchName} 
              </h2>
              <div >
                <p>
                  <b>Fecha:</b>{match.dateTime}
                </p>
                <p>
                  <b>Type:</b>{match.matchType}
                </p>
                <p>
                  <b>Horario:</b>{match.localTime}
                </p>
                <p>
                <b>Direction:</b>{match.direction}
              </p>
                <p>
                  <b>Descripción:</b>{match.description}
                </p>
                <div className="map mapcontainer"  ref={e => (this.mapContainer = e)}/>
                <div>
                <p>
                  <b>Players:</b>
                </p>
                {match.players ? match.players.map((
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
              <div>
              <p>
              <b>Teams:</b>
              </p>
              {match.teams ? match.teams.map((
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
                  <Link className="event-button" exact to={`/team/${_id}`} type="button" > {name}</Link>
                }
                </div>
                </div>
              )) : <div className="App">
              <Skeleton avatar paragraph={{ rows: 4 }} />
              </div> 
            }
            </div>
              </div>
              {match.owner._id === context.user._id ? 
                <Button 
                onClick={e => {
                  context.deletMatch(`/matchs/${match._id}`);
                  this.props.history.push('/matchs')
                }}
                className="event-buttondelete" exact to={`/profile`} >
                  Delete Match
                </Button>: <div></div>
              }
            </div>
          </div>
         
        </div>
       <div>
          <h2 className="titulo-mis-eventos">Comentarios</h2>
        </div>
{match.comments.map(({ 
  content,
  owner,
 _id }  
 ) => ( 
    <div>
        <Row key={`${_id}`} type="flex" justify="left" align="left">
          <Col sm={4} md={6} lg={8}>
            <img
              src={`${owner.image}`}
              alt="Foto de perfil"
              className="foto-comentario"
            />
          </Col>
          <Col sm={4} md={6} lg={8}>
            <p>
              <b>{owner.name}</b>
            </p>
            <p>{content}</p>
          </Col>
        </Row>
        </div>
        ))}
      </div>
    </div>
      )}
    </MyContext.Consumer>
    <Form

    onSubmit={e => {
      this.handleComment(e);
    }}
  >
    <Form.Item>
      <Input
        name="content"
        placeholder="Comment.."
        type="text"
        value={this.state.formComment.content}
        onChange={this.inputChange}
      />
    </Form.Item>
    <Form.Item className="text-center">
      <Button type="primary" htmlType="submit">
        Comment
      </Button>
    </Form.Item>
  </Form>
  </div>
  );}
  }


export default MatchDetail

