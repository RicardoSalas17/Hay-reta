import React from "react";
import { Form, Input, Icon, Button, Row, Col, Typography } from "antd";
import { MyContext } from "../../context";
const { Title } = Typography;
export default class LoginContainer extends React.Component {
  componentDidUpdate() {
    if (this.context.loggedUser) {
      return this.props.history.push(`/profile`);
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Row type="flex" justify="space-around" align="middle" className= "signup fondoGris" 
          theme="dark">
            <Col>
            <Title type="danger">Log in</Title>
              <Form
              span={8} 
                onSubmit={e => {
                  context.handleLogin(e, () => {
                    this.props.history.push(`/profile`);
                  });
                }}
              >
                <Form.Item>
                  <Input
                    name="email"
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                    type="email"
                    value={context.loginForm.email}
                    onChange={e => context.handleInput(e, "loginForm")}
                  />
                </Form.Item>

                <Form.Item>
                  <Input
                    name="password"
                    type="password"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Password"
                    value={context.loginForm.password}
                    onChange={e => context.handleInput(e, "loginForm")}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="danger" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
      </MyContext.Consumer>
    );
  }
}

LoginContainer.contextType = MyContext;
