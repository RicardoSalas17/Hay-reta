import React, { Component } from "react";
import { Form, Input, Button, Select} from 'antd'
import { MyContext } from '../../context'
import MY_SERVICE from '../../services/index';
import Swal from 'sweetalert2'
import L from 'leaflet'

const { Option } = Select;

let children = [];
let childrens = [];

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
        locationSearch: '',
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

  handleLocationSearchChange = ({ target: { value } }) => {
    this.setState({ locationSearch: value })
  }

  updateLocation = ({ lat, lng, direction }) => {
    const nextLat = Number(lat)
    const nextLng = Number(lng)

    this.setState((prevState) => ({
      lng: nextLng,
      lat: nextLat,
      matchForm: {
        ...prevState.matchForm,
        lng: nextLng,
        lat: nextLat,
        direction: direction || prevState.matchForm.direction || 'Pinned location'
      }
    }))

    if (this.marker) {
      this.marker.setLatLng([nextLat, nextLng])
    } else if (this.map) {
      this.marker = L.circleMarker([nextLat, nextLng], {
        radius: 8,
        color: '#f5222d'
      }).addTo(this.map)
    }

    if (this.map) {
      this.map.setView([nextLat, nextLng], 14)
    }
  }

  searchLocation = async () => {
    const { locationSearch } = this.state
    const apiKey = process.env.REACT_APP_GEOAPIFY_KEY

    if (!locationSearch.trim()) {
      Swal.fire('Write a location first', '', 'warning')
      return
    }

    if (!apiKey) {
      Swal.fire('Missing map search configuration', 'Add REACT_APP_GEOAPIFY_KEY to the frontend environment variables.', 'error')
      return
    }

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationSearch)}&limit=1&apiKey=${apiKey}`
      )
      const data = await response.json()
      const feature = data.features && data.features[0]

      if (!feature) {
        Swal.fire('Location not found', 'Try a more specific address or place name.', 'warning')
        return
      }

      this.updateLocation({
        lat: feature.properties.lat,
        lng: feature.properties.lon,
        direction: feature.properties.formatted
      })
    } catch (error) {
      Swal.fire('Location search failed', 'Please try again later.', 'error')
    }
  }


  addMatch = async e => {
    e.preventDefault();
    const { matchForm,
      } = this.state;
    const formData = new FormData()

    for(let key in matchForm){
      formData.append(key, this.state.matchForm[key])
    }
    formData.append('image', this.state.file)

    
     MY_SERVICE.createMatch(formData)

     .then(({ data }) => {
      Swal.fire( `Match created`, 'success')
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
    children = [];
    childrens = [];
    this.props.history.push('/matchs')
    })
    .catch(err => {
      if (`${err}`.includes(400)){
        Swal.fire(`You must write all information`, '☠️', 'error')
      }else if(`${err}`.includes(401)){
        Swal.fire(`Invalid match try with other name`, '☠️', 'error')
      }else {
        Swal.fire(`Please try again later`, '☠️', 'error')
      }
    })
   
    
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
    this.map = L.map(this.mapContainer).setView([lat, lng], zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map)

    this.map.on('click', (event) => {
      this.updateLocation({
        lat: event.latlng.lat.toFixed(6),
        lng: event.latlng.lng.toFixed(6),
        direction: this.state.matchForm.direction || 'Pinned location'
      })
    })
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove()
    }
  }

  handleChange= (e,a, c) =>{
    this.setState({
      [a]: {
        ...this.state[a],
        [c]: e
      }
    })
  }
  render() {
    return (
        <MyContext.Consumer>
        {context => (
      <div className="fondoGris">

      <div>
      <h1>Add Match</h1>
      </div>
        <Form
            className=""
            onSubmit={e => {
              this.addMatch(e)
            }}
            >
            <div className="map" style={{ width: '400px', height: '300px'}} ref={e => (this.mapContainer = e)}/>
            <Form.Item>
              <Input.Search
                placeholder="Search address or place"
                value={this.state.locationSearch}
                onChange={this.handleLocationSearchChange}
                onSearch={this.searchLocation}
                enterButton="Search map"
              />
            </Form.Item>
            <Form.Item>
              <Input
                name="direction"
                type="text"
                placeholder="Selected location"
                value={this.state.matchForm.direction}
                onChange={this.inputChange}
              />
            </Form.Item>
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
          onChange={e => this.handleChange(e, "matchForm","teams" )}
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
            <Button type="danger" htmlType="submit">
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
