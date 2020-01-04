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
    teamForm: {
      name:'',
      image:'',
      players:[],

      },
    user: {},
    file:{},
    users:{}
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

    if(this.state.loggedUser){
      MY_SERVICE.getUsers()
      .then(({ data }) => {
        this.setState({users: data })
      })
      .catch(err => console.log(err))
    
    }
  }componentWillUpdate(){
  if (!document.cookie) {
    MY_SERVICE.getUser()
      .then(({ data }) => {
        this.setState({ loggedUser: true, user: data.user })
      })
      .catch(err => console.log(err))
  }

  // if(this.state.loggedUser){
  //   MY_SERVICE.getUsers()
  //   .then(({ data }) => {
  //     this.setState({users: data })
  //   })
  //   .catch(err => console.log(err))
  
  // }

}

handleUser =()=>{
  MY_SERVICE.getUser()
  .then(({ data }) => {
    this.setState({ loggedUser: true, user: data.user })
  })
  .catch(err => console.log(err))
}

handleUsers=()=>{
  MY_SERVICE.getUsers()
      .then(({ data }) => {
        this.setState({users: data })
      })
      .catch(err => console.log(err))
}

  handleInput = (e, obj) => {
    const a = this.state[obj]
    const key = e.target.name
    a[key] = e.target.value
    this.setState({ obj: a })
  }


handleChange= (e,a, c) =>{
  const s = this.state[a]
  const key = c
  s[key] = e
  this.setState({ obj: {s}})
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


  deletUser = async (a) => {
    await MY_SERVICE.deletUser(a)
    window.localStorage.clear()
    this.setState({ loggedUser: false, user: {} })
  }

  deleteTeam= async (a) => {
    await MY_SERVICE.deleteTeam(a)

  }


  updateTeam= async (e,a) => {
    e.preventDefault()
    const { teamForm } = this.state;
    const formDatas = new FormData()

    for(let key in teamForm){
      formDatas.append(key, this.state.teamForm[key])
    }
    formDatas.append('image', this.state.file)

    const team = await MY_SERVICE.updateTeam(a,formDatas)


    Swal.fire(`Team ${team} `, 'Team created', 'success')
    this.setState({ 
      teamForm: {
            name: '',
             image:'',
             players:[]
      }
    })
  }
  
  createTeam = async e=> {
    e.preventDefault()
    const { teamForm } = this.state;
    const formDatas = new FormData()

    for(let key in teamForm){
      formDatas.append(key, this.state.teamForm[key])
    }
    formDatas.append('image', this.state.file)

    const team = await MY_SERVICE.addTeam(formDatas)


    Swal.fire(`Team ${team.data.name} `, 'Team created', 'success')
    this.setState({ 
      teamForm: {
            name: '',
             image:'',
             players:[]
      }
    })
  };

  render() {

    return (
      <MyContext.Provider
        value={{
          loggedUser: this.state.loggedUser,
          formSignup: this.state.formSignup,
          teamForm: this.state.teamForm,
          loginForm: this.state.loginForm,
          user: this.state.user,
          handleInput: this.handleInput,
          updateTeam:this.updateTeam,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handlecreateEvent: this.handlecreateEvent,
          handleFile:this.handleFile,
          handleUser:this.handleUser,
          deletUser:this.deletUser,
          deleteTeam:this.deleteTeam,
          handleUsers:this.handleUsers,
          handleupdateEvent:this.handleupdateEvent,
          createTeam:this.createTeam,
          users:this.state.users,
          handleChange:this.handleChange
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }

  
}


export default MyProvider


  // handleEvents =  () => {
  //   MY_SERVICE.getEvents().then(({ data }) => { 
  //     this.setState({  events:data.events })

  //   })
  //   .catch(err => console.log(err))
  // }

