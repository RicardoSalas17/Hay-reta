import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { MyContext } from '../../context'
import { withRouter } from 'react-router-dom'
import { Avatar } from "antd";

const StyledNavbar = styled.nav`
background: rgba(0, 0, 0, 0.863) !important;
  width: 100vw;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  box-sizing: border-box;
  & a {
    padding: 5px 5px 5px 10px;
    color: rgb(3, 214, 39);
    text-decoration: none;
  }
  & a.navbar-active {
    color: blue;
  }
  & span {
    color: red;

    padding: 5px 5px 5px 10px;
  }

`

function Navbar(props) {

  return (
    <MyContext.Consumer>
      {context => {
        return (
          <StyledNavbar>
            <NavLink exact to="/" activeClassName="navbar-active">
              Home
            </NavLink>
            {!context.loggedUser && (
            <NavLink exact to="/signup" activeClassName="navbar-active">
              Signup
            </NavLink>
            )}
            
            {!context.loggedUser && (
              <NavLink exact to="/login" activeClassName="navbar-active">
                Login
              </NavLink>
            )}
            
            {context.loggedUser && (
            
                <NavLink
                exact to="/profile" activeClassName="navbar-active"
                >
                <Avatar src={`${context.user.image}`}
                />
                  Profile
                </NavLink>

               
           
            )}

            {context.loggedUser && (
            
              <NavLink
              exact to="/addteam" activeClassName="navbar-active"
              >
              Add Team
              </NavLink>
          )}

            

            {context.loggedUser && (
            
                <NavLink
                exact to="/events" activeClassName="navbar-active"
                >
                 Matchs
                </NavLink>
           
            )}
            
            {context.loggedUser && (
              <span
                onClick={() =>
                  context.handleLogout(() => {
                    props.history.push('/login')
                  })
                }
              >
                Logout
              </span>
            )}
          </StyledNavbar>
        )
      }}
    </MyContext.Consumer>
  )
}

export default withRouter(Navbar)