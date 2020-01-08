import React from 'react'
import { NavLink } from 'react-router-dom'
import { MyContext } from '../../context'
import { withRouter } from 'react-router-dom'
import { Avatar, Menu } from "antd";


function Navbar(props) {

  return (
    <MyContext.Consumer>
      {context => {
        return (

          <Menu className="navBar">
         
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
              exact to={`/addteam`}
              activeClassName="navbar-active"
              >
              Add Team
              </NavLink>

          )}
                <NavLink
                exact to="/matchs" activeClassName="navbar-active"
                >
                 Matches
                </NavLink>

            {context.loggedUser && (
            
              <NavLink
              exact to="/addmatchs" activeClassName="navbar-active"
              >
              Add  Match
              </NavLink>
         
          )}
            
            {context.loggedUser && (
              <button
                onClick={() =>
                  context.handleLogout(() => {
                    props.history.push('/login')
                  })
                }
              >
                Logout
              </button>
            )}
          </Menu>
        )
      }}
    </MyContext.Consumer>
  )
}

export default withRouter(Navbar)