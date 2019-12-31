import React from "react";
import { Form, Input, Icon, Button } from "antd";
import { MyContext } from "../../context";

export default function SignupContainer(props) {
  return (
    <MyContext.Consumer>
      {context => (
        <div className="signup-div">
          <div className="d-flex justify-content-center align-items-center h-100">
            <Form
              className=" p-2 p-md-5 "
              onSubmit={e => {
                context.handleSignup(e);
                props.history.push("/profile");
              }}
            >
              <Form.Item>
                <Input
                  name="name"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  type="text"
                  value={context.formSignup.name}
                  onChange={e => context.handleInput(e, "formSignup")}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  name="email"
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  type="email"
                  value={context.formSignup.email}
                  onChange={e => context.handleInput(e, "formSignup")}
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
                  value={context.formSignup.password}
                  onChange={e => context.handleInput(e, "formSignup")}
                />
              </Form.Item>

              <Form.Item>
              <Input
                name="image"
                type="file"
                placeholder="Image"
                onChange={e => context.handleFile(e, "file")}/>
            </Form.Item>

              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </MyContext.Consumer>
  );
}