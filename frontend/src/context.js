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
  }

  componentDidUpdate(){
    if(this.state.loggedUser === true){
    MY_SERVICE.getUser()
    .then(({ data }) => {
      this.setState({  user: data.user })
    })
    .catch(err => console.log(err))}
}

handleUser =()=>{
  MY_SERVICE.getUser()
  .then(({ data }) => {
    this.setState({ user: data.user })
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
    MY_SERVICE.signup(formData)
    .then(({ data }) => {
      Swal.fire(`Walcome ${data.user.name} `, 'Please make login ' , 'success')
      this.setState({ 
        formSignup: {
          name: '',
          email: '',
          password: '',
          image:''
        }
      })})
      
    .catch(err => {
      if (`${err}`.includes(400)){
        
        Swal.fire(`You must have an email or password`, '☠️', 'error')
      }else if(`${err}`.includes(401)){
        Swal.fire(`This email already exist `, '☠️', 'error')
      }else {
        console.log(err)
        Swal.fire(`Please try again`, '☠️', 'error')
      }
    })
  }


  handleLogin = (e, cb) => {
    e.preventDefault()
    MY_SERVICE.login(this.state.loginForm)
      .then(({ data }) => {
        this.setState({ loggedUser: true, user: data.user })
        Swal.fire(`Bienvenido ${data.user.name}`, 'Logeado Correctamente', 'success')
        cb()
      })
      .catch(err => {

        if (`${err}`.includes(400)){
        
          Swal.fire(`You must have an email or password`, '☠️', 'error')
        }else if(`${err}`.includes(401)){
          Swal.fire(`Invalid email or password `, '☠️', 'error')
        }else {

          Swal.fire(`Please try again later`, '☠️', 'error')
        }
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

  deletMatch = async (a) => {
    await MY_SERVICE.deletMatch(a)
  }

  updateTeam= async (e,a) => {
    e.preventDefault()
    const { teamForm } = this.state;
    const formDatas = new FormData()

    for(let key in teamForm){
      formDatas.append(key, this.state.teamForm[key])
    }
    formDatas.append('image', this.state.file)

  await MY_SERVICE.updateTeam(a,formDatas)


    

    Swal.fire( 'Team updated', 'success')
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

    await MY_SERVICE.addTeam(formDatas)
    .then(({ data }) => {
      console.log(data)
      Swal.fire(`Team ${data.name} created` ,'success')
      this.setState({ 
        teamForm: {
              name: '',
               image:'',
               players:[]
        }
      })
    })
    .catch(err => {

      if (`${err}`.includes(400)){
      
        Swal.fire(`You must write all information`, '☠️', 'error')
      }else if(`${err}`.includes(401)){
        Swal.fire(`Invalid team try with other name`, '☠️', 'error')
      }else {

        Swal.fire(`Please try again later`, '☠️', 'error')
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
          deletMatch:this.deletMatch,
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



