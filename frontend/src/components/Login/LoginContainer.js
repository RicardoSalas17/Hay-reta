import React from "react";
import { Form, Input, Icon, Button } from "antd";
import { MyContext } from "../../context";

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
          <div className="login-div">
            <div className="d-flex justify-content-center align-items-center h-100">
              <Form
                className=" p-2 p-md-5"
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
                <Form.Item className="text-center">
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

LoginContainer.contextType = MyContext;
