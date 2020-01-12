import React from 'react'
import { NavLink } from 'react-router-dom'
import { MyContext } from '../../context'
import { withRouter } from 'react-router-dom'
import { Avatar, Menu, Row, Col } from "antd";

function Navbar(props) {

  return (
    <MyContext.Consumer>
      {context => {
        return (
          <Menu className="navBar" mode="inline"
          theme="dark">
         
          <Row>
          
          <Col span={3} className="">
            <NavLink exact to="/" activeClassName="navbar-active">
              Home
            </NavLink>
            </Col>

            {!context.loggedUser && (
              <Col span={3} className="">
            <NavLink exact to="/signup" activeClassName="navbar-active">
              Signup
            </NavLink>
            </Col>
            )}

            {!context.loggedUser && (
              <Col span={3} className="">
              <NavLink exact to="/login" activeClassName="navbar-active">
                Login
              </NavLink>
              </Col>
            )}


            {context.loggedUser && (
              <Col span={3} className="">
            
                <NavLink
                exact to="/profile" activeClassName="navbar-active"
                >
                <Avatar src={`${context.user.image}`}
                />
                  Profile
                </NavLink>
                </Col>
            )}

            {context.loggedUser && (            
              <Col span={3} className="">
              <NavLink
              exact to={`/addteam`}
              activeClassName="navbar-active"
              >
              Add Team
              </NavLink>

              </Col>
          )}

              <Col span={3} className="">
                <NavLink
                exact to="/matchs" activeClassName="navbar-active"
                >
                 Matches
                </NavLink>
</Col>

{context.loggedUser && (
  <Col span={3} className="">
            
              <NavLink
              exact to="/addmatchs" activeClassName="navbar-active"
              >
              Add  Match
              </NavLink>
         
              </Col>
          )}

          {context.loggedUser && (
            <Col span={3} className="">
              <button
                onClick={() =>
                  context.handleLogout(() => {
                    props.history.push('/login')
                  })
                }
              >
                Logout
              </button>
              </Col>
            )}

            </Row>

          </Menu>
        )
      }}
    </MyContext.Consumer>
  )
}

export default withRouter(Navbar)