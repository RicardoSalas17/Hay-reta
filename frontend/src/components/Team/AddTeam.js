import React, { Component } from "react";
import { Form, Input, Button } from 'antd'
import { MyContext } from '../../context'
import MY_SERVICE from '../../services/index';
import Swal from 'sweetalert2'

export default class AddTeam extends Component {
  state = {

      formEvent: {
        eventName: '',
        dateTime: '',
        localTime: '',
        description: '',
        lng: '',
        lat: '',
        direction:''},
        lng: 5,
        lat: 34,
        zoom: 1.5,
        file: {},
  };

 
  handleFile = e => {
    this.setState({ file: e.target.files[0] })
  }

  inputChange = ({ target: {value, name} }) =>{
    this.setState({
      ...this.state,
      formEvent:{
        ...this.state.formEvent,
        [name]:value
      }
    });
  };


  addEvent = async e => {
    e.preventDefault();
    const { formEvent,
      } = this.state;
    const formData = new FormData()

    for(let key in formEvent){
      formData.append(key, this.state.formEvent[key])
    }
    formData.append('image', this.state.file)

    
    const event = await MY_SERVICE.createEvent(formData)
    Swal.fire( 'Event created', 'success')
    this.setState({ 
      formEvent: {
        eventName: '',
        dateTime: '',
        localTime: '',
        description: '',
        image:'',
        lng: '',
        lat: '',
        direction:''
      }
    })
    this.props.history.push('/events')
  };

  componentDidMount() {

  }
  render() {
    return (
        <MyContext.Consumer>
        {context => (
      <div className="backgroundCard">

      <div className="text-center">
      <h1>Add Team</h1>
      </div>
        <Form
            className="container"
            onSubmit={e => {
              this.addEvent(e)
              this.props.history.push('/events')
              // Redirect('/events')
              // context.handleEvents()
            }}
            >

            <Form.Item>
            <Input
            name="eventName"
            type="text"
            placeholder="eventName"
          value={this.state.formEvent.eventName}
          onChange={this.inputChange}
        />
      </Form.Item>
          <Form.Item>
            <Input
              name="dateTime"
              // placeholder="000"
              type="date"
              value={this.state.formEvent.dateTime}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              name="localTime"
              type="time"
              placeholder="Time"
              value={this.state.formEvent.localTime}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              name="description"
              type="text"
              placeholder="Description"
              value={this.state.formEvent.description}
              onChange={this.inputChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              name="image"
              type="file"
              placeholder="Image"
              // value={this.state.formEvent.image}
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

//     coordinates: Array(2)
// 0: 36.33
// 1: 41.28667
// place_name_es-ES