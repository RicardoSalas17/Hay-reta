import React, { Component } from "react";
import { Form, Input, Button, Select} from 'antd'
import { MyContext } from '../../context'
import MY_SERVICE from '../../services/index';
import Swal from 'sweetalert2'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'mapbox-gl' 

mapboxgl.accessToken =
'pk.eyJ1IjoiZGl1cml2aiIsImEiOiJjanAxdjA2cTQwMGp1M2tvYzZmZGp3bWc3In0.4cZEyLkU2ikqx_wb4A1z8A'

const { Option } = Select;

const children = [];
const childrens = [];

export default class AddMatch extends Component {
  state = {
      matchForm: {
        matchName: '',
        matchType:'',
        dateTime: '',
        localTime: '',
        description: '',
        lng: '',
        lat: '',
        players:[],
        teams:[],
        direction:''},
        lng: 5,
        lat: 34,
        zoom: 1.5,
        file: {},
        users:[],
        teams:[]
  };

 


  handleFile = e => {
    this.setState({ file: e.target.files[0] })
  }

  inputChange = ({ target: {value, name} }) =>{
    this.setState({
      ...this.state,
      matchForm:{
        ...this.state.matchForm,
        [name]:value
      }
    });
  };
  // handleChange= (e,a, c) =>{
  //   const s = this.state[a]
  //   const key = c
  //   s[key] = e
  //   this.setState({ obj: {s}})
  // }

  addMatch = async e => {
    e.preventDefault();
    const { matchForm,
      } = this.state;
    const formData = new FormData()

    for(let key in matchForm){
      formData.append(key, this.state.matchForm[key])
    }
    formData.append('image', this.state.file)

    
    const match = await MY_SERVICE.createMatch(formData)
    Swal.fire( `Match ${match.name} created`, 'success')
    this.setState({ 
      matchForm: {
        matchName: '',
        matchType:'',
        dateTime: '',
        localTime: '',
        description: '',
        lng: '',
        lat: '',
        direction:''
      }
    })
    this.props.history.push('/matchs')
    
  };

 
  async componentDidMount() {
      const { data } = await MY_SERVICE.getTeams()

    this.setState({ teams: [...data.team] })
    for (let i = 0; i < this.state.teams.length; i++) {
      childrens.push(<Option value={this.state.teams[i]._id} key= {i} >{this.state.teams[i].name}</Option>);
      }
      const hola = await MY_SERVICE.getUsers()

      this.setState({ users: [...hola.data.users] })
      for (let i = 0; i < this.state.users.length; i++) {
          children.push(<Option value={this.state.users[i]._id} key= {i} >{this.state.users[i].name}</Option>);
        }
    const { lng, lat, zoom } = this.state
    const geocoder = new MapboxGeocoder({
      
      accessToken: mapboxgl.accessToken
    })
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      marker: true,
      zoom
    })

    map.on('move', () => {
      const { lng, lat } = map.getCenter()

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(15)
      })
    })
    
    map.addControl(geocoder)
    geocoder.on('result', (e) => {
      

      this.setState({
        matchForm:{
        lng: e.result.geometry.coordinates[0],
        lat: e.result.geometry.coordinates[1],
        direction:`${e.result.place_name}`
        }
      })

    })
  }
  handleChange= (e,a, c) =>{
    const s = this.state[a]
    const key = c
    s[key] = e
    this.setState({ obj: {s}})
  }
  render() {
    return (
        <MyContext.Consumer>
        {context => (
      <div className="backgroundCard">

      <div className="text-center">
      <h1>Add Match</h1>
      </div>
        <Form
            className="container"
            onSubmit={e => {
              this.addMatch(e)
              this.props.history.push('/matchs')
            }}
            >
            <div className="map" style={{ width: '400px', height: '300px'}} ref={e => (this.mapContainer = e)}/>
            <Form.Item>
            <Input
            name="matchName"
            type="text"
            placeholder="matchName"
          value={this.state.matchForm.matchName}
          onChange={this.inputChange}
        />
      </Form.Item>

      <Form.Item>
            <Input
              name="matchType"
              type="text"
              placeholder="matchType"
              value={this.state.matchForm.matchType}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              name="dateTime"
              type="date"
              value={this.state.matchForm.dateTime}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              name="localTime"
              type="time"
              placeholder="Time"
              value={this.state.matchForm.localTime}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
          <Select
          mode="multiple"
          placeholder="players"
          style={{ width: '100%' }}
          onChange={e => this.handleChange(e, "matchForm","players" )}
        >
        {children}
        </Select>

          </Form.Item>
          <Form.Item>
          <Select
          mode="multiple"
          placeholder="Teams"
          style={{ width: '100%' }}
          onChange={e => this.handleChange(e, "matchForm","Teams" )}
        >
        {childrens}
        </Select>
          </Form.Item>

          <Form.Item>
            <Input
              name="description"
              type="text"
              placeholder="Description"
              value={this.state.matchForm.description}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              name="image"
              type="file"
              placeholder="Image"
              onChange={this.handleFile}/>
          </Form.Item>
          
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    )}
    </MyContext.Consumer>
        )
        }
    }

