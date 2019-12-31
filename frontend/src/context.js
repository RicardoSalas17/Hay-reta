import React, { Component, createContext } from 'react'
import MY_SERVICE from './services/index'
import Swal from 'sweetalert2'


export const MyContext = createContext()

class MyProvider extends Component {
  state = {
    loggedUser: false,
    formSignup: {
      name: '',
      email: '',
      password: '',
      image:''
    },
    loginForm: {
      email: '',
      password: ''
    },
    formEvent:{
    eventName: '',
    dateTime: '',
    localTime: '',
    description: '',
    image:'',
    },
    formComment:{
      content: '',
      image:'',
      },
    user: {},
    events:'Loading...',
    file:{}

  }

  componentDidMount() {
    if (!document.cookie) {
      MY_SERVICE.getUser()
        .then(({ data }) => {
          this.setState({ loggedUser: true, user: data.user })
          Swal.fire(`Welcome back ${data.user.name} `, '', 'success')
        })
        .catch(err => console.log(err))
    }
    this.handleEvents()
  }

  componentDidUpdate() {
    MY_SERVICE.getUser()
    .then(({ data }) => {
      this.setState({ loggedUser: true, user: data.user })
    })
    .catch(err => console.log(err))

  }



  handleInput = (e, obj) => {
    const a = this.state[obj]
    const key = e.target.name
    a[key] = e.target.value
    this.setState({ obj: a })
  }


  handleFile = e => {
    this.setState({ file: e.target.files[0] })
  }


  handleSignup = async e => {
    e.preventDefault();
    const { formSignup } = this.state;
    const formData = new FormData()

    for(let key in formSignup){
      formData.append(key, this.state.formSignup[key])
    }
    formData.append('image', this.state.file)

    const user = await MY_SERVICE.signup(formData)

    
    Swal.fire(`Bienvenido ${user.data.name}`, 'Gracias por registrate', 'success')
    this.setState({ loggedUser: true, user: user.data })
    this.setState({ 
      formSignup: {
        name: '',
        email: '',
        password: '',
        image:''
      }
    })
  };



  handleLogin = (e, cb) => {
    e.preventDefault()
    MY_SERVICE.login(this.state.loginForm)
      .then(({ data }) => {
        this.setState({ loggedUser: true, user: data.user })
        Swal.fire(`Bienvenido ${data.user.name}`, 'Logeado Correctamente', 'success')
        cb()
      })
      .catch(err => {
        Swal.fire(`Quien sabe que paso`, '☠️', 'error')
      })
  }

  handleLogout = async cb => {
    await MY_SERVICE.logout()
    window.localStorage.clear()
    this.setState({ loggedUser: false, user: {} })
    cb()
  }

  handleEvents =  () => {
    MY_SERVICE.getEvents().then(({ data }) => { 
      this.setState({  events:data.events })

    })
    .catch(err => console.log(err))
  }


  render() {

    return (
      <MyContext.Provider
        value={{
          loggedUser: this.state.loggedUser,
          formSignup: this.state.formSignup,
          formEvent: this.state.formEvent,
          loginForm: this.state.loginForm,
          user: this.state.user,
          events: this.state.events,
          handleInput: this.handleInput,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handlecreateEvent: this.handlecreateEvent,
          handleFile:this.handleFile,
          handleEvents:this.handleEvents,
          handleUser:this.handleUser,
          handleupdateEvent:this.handleupdateEvent,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }

  
}


export default MyProvider
