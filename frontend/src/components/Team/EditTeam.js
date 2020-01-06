import React, { Component } from "react";
import MY_SERVICE from '../../services/index';
import { Form, Input, Button, Select } from 'antd'
import {Redirect} from 'react-router-dom'
import { MyContext } from '../../context'
import { Skeleton } from 'antd'

const { Option } = Select;

const children = [];


export default class editTeams extends Component {

  state={
    users:[]
  }
    async componentDidMount()  {
      console.log()
      console.log(this.props.location.pathname)
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
      <h1>Edit Team</h1>
      </div>
        <Form
            className="container"
            onSubmit={e => {
              context.updateTeam(e, `/editteam/${this.props.match.params.id}`);
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
          placeholder="players"
          style={{ width: '100%' }}
          onChange={e => context.handleChange(e, "teamForm","players" )}
        >
        {children}
        </Select>
          </Form.Item>
          
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )}}}
    </MyContext.Consumer>
        )}
        }
    }