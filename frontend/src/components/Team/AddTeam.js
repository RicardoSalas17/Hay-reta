import React, { Component } from "react";
import MY_SERVICE from '../../services/index';
import { Form, Input, Button, Select } from 'antd'
import { Redirect} from 'react-router-dom'
import { MyContext } from '../../context'
import { Skeleton } from 'antd'

const { Option } = Select;

let children = [];




export default class AddTeam extends Component {

  state={
    users:[]
  }

    async componentDidMount() {
    const { data } = await MY_SERVICE.getUsers()
    this.setState({ users: [...data.users] })
    for (let i = 0; i < this.state.users.length; i++) {
        children.push(<Option value={this.state.users[i]._id} key= {i} >{this.state.users[i].name}</Option>);
      }
  }
  render() {
    const { users } = this.state

    if (!users) {
      const { data } =  MY_SERVICE.getUsers()
      this.setState({ users: [...data.users] })
      for (let i = 0; i < this.state.users.length; i++) {
          children.push(<Option value={this.state.users[i]._id} key= {i} >{this.state.users[i].name}</Option>);
        }
      return (
        <div className="App">
        <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      )
    } else{
    return (
        <MyContext.Consumer>
        {context => {
          if (!context.loggedUser) {
            return <Redirect to="/login" />
           } else{
          return(
      <div className="backgroundCard">
      <div className="text-center">
      <h1>Add Team</h1>
      </div>
        <Form
            className="container"
            onSubmit={e => {
              context.createTeam(e);
              children =[]
              this.props.history.push(`/profile`);
              
            }}
            >
            <Form.Item>
            <Input
            name="name"
            type="text"
            placeholder="name"
            value={context.teamForm.name}
          onChange={e => context.handleInput(e, "teamForm")}
        />
      </Form.Item>

          <Form.Item>
            <Input
            name="image"
            type="file"
            placeholder="Image"
            onChange={e => context.handleFile(e, "file")}/>
          </Form.Item>

          <Form.Item>
          <Select
          mode="multiple"
          placeholder="Who organizes?"
          style={{ width: '100%' }}
          onChange={e => context.handleChange(e, "teamForm","players" )}
        >
        {children}
        </Select>
          </Form.Item>
          
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    )}}}
    </MyContext.Consumer>
        )}
        }
    }

