const User = require('../models/User')
const Team = require('../models/Team')

exports.getUsers= async(req,res) => {

  const users = await User.find().populate({path:"matchs"})
  .populate({
   path:"teams"})
 res.status(200).json({ users });
}

exports.createUser = async (req, res) => {
  const { 
     name,
    email
       } = req.body
     let createUser


  if (req.file) {
    createUser ={
    name,
    email,
    image: req.file.secure_url
     }

    }
     else{
      createUser ={
        name,
        email
         }
        }

    const user = await User.register(createUser, req.body.password)

  return res.status(201).json(user)
}


exports.editUser = async (req, res) => {
  const { name
          } = req.body
          const { id } = req.params
          let userUpdate

  if (req.file) {
     userUpdate = await User.findByIdAndUpdate(id,{
      $set:
    {  name,
    image: req.file.secure_url}
      
    })}
  else {
     userUpdate = await User.findByIdAndUpdate(id,{
    $set:
   {
    name
    } 
  })
}

User.findOneAndUpdate(id, userUpdate) 

  res.status(201).json(userUpdate);
}


exports.login = (req, res, next) => {
  res.status(200).json({ user: req.user })
}

exports.getUser = async (req, res, next) => {

  const user = await User.findById(req.user._id).populate({
    path:"teams",
    populate:{ 
    path: "players",
    model:"User",
    }
    })
  res.status(200).json({ user })
}

exports.logout = (req, res, next) => {
  req.logout()
  res.clearCookie('connect.sid')
  res.status(200).json({ msg: 'Logged Out' })
}



exports.getotherUser =async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path:"teams",
      populate:{ 
      path: "players",
      model:"User",
      }
      })
    res.status(200).json(user);
  };

  exports.deleteUser =async (req, res) => {
    const { _id } = req.user;
    const  ids = req.user.teams
    console.log(ids.length)
    console.log(req.user.teams)
    for(i=0; i<ids.length; i++){
      const teams = await Team.findByIdAndDelete(ids[i])
      }
    
    const user = await User.findByIdAndDelete(_id)
    res.status(200).json(user);
  };