import React, { Component } from "react";
import { Form, Input, Button } from 'antd'
import { MyContext } from '../../context'
import MY_SERVICE from '../../services/index';
import Swal from 'sweetalert2'
// import ProjectsService from "../../services/ProjectsService";

// const projectsService = new ProjectsService();

export default class EditUser extends Component {
  state = {

      formUser: {
        name: '',},
        file: {},
        id:`${this.props.location.pathname}`
        
  };

  handleFile = e => {
    this.setState({ file: e.target.files[0] })
  }

  inputChange = ({ target: {value, name} }) =>{
    this.setState({
      ...this.state,
      formUser:{
        ...this.state.formUser,
        [name]:value
      }
    });
  };

  editEvent = async e => {
    e.preventDefault();
    const { formUser } = this.state;
    const formData = new FormData()

    for(let key in formUser){
      formData.append(key, this.state.formUser[key])
    }
    formData.append('image', this.state.file)
    

    const event = await MY_SERVICE.updateUser(`${this.props.location.pathname}`,formData)

    Swal.fire( 'User updated', 'success')
    this.setState({ 
      formUser: {
        name: '',
        image:'',
      }
    })
    this.props.history.push('/profile')
 
  };

  render() {
    return (
        <MyContext.Consumer>
        {context => (
      <div className="backgroundprofile h-8">
        <h1>Edit Profile</h1>
        <Form
            className="container"
            onSubmit={e => {
              this.editEvent(e)
              this.props.history.push('/profile')
            }}
            >
            

          <Form.Item>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={this.state.formUser.name}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    )}
    </MyContext.Consumer>
        )
        }
    }