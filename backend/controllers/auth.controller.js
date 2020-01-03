const User = require('../models/User')

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
    // populate:{ 
    // path: "comments",
    // model:"Comments",
    // populate:{path:"subComments"}
    // }
    })
  res.status(200).json({ user })
}

exports.logout = (req, res, next) => {
  req.logout()
  res.clearCookie('connect.sid')
  res.status(200).json({ msg: 'Logged Out' })
}