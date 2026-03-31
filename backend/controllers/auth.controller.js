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
    const password = req.body.password;

    if (email === "" || password === "") {
      res.status(400).json({  message: "Indicate username and password"})
       return
     }

    const existingUser = await User.findOne({ email }, 'email')
    if (existingUser) {
      res.status(401).json({ message: "The username already exists" });
      return;
    }

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

          User.register(createUser, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));

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
      
    }, { new: true })}
  else {
     userUpdate = await User.findByIdAndUpdate(id,{
    $set:
   {
    name
    } 
  }, { new: true })
}

  res.status(201).json(userUpdate);
}


exports.login = (req, res, next) => {
  res.status(200).json({ user: req.user })
}

exports.getUser = async (req, res, next) => {
if (!req.user || !req.user._id) {
  res.status(401).json({ msg: 'Log in first' })
} else {
  const user = await User.findById(req.user._id).populate({
    path:"teams",
    populate:{ 
    path: "players",
    model:"User",
    }
    }).populate({
      path:"matchs",
      populate:{ 
      path: "players",
      model:"User",
      }
      }).populate({
        path:"matchs",
        populate:{ 
        path: "teams",
        model:"Team",
        }
        })
  res.status(200).json({ user })}
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
      }).populate({
        path:"matchs",
        populate:{ 
        path: "players",
        model:"User",
        }
        }).populate({
          path:"matchs",
          populate:{ 
          path: "teams",
          model:"Team",
          }
          })
    res.status(200).json(user);
  };

  exports.deleteUser =async (req, res) => {
    const { _id } = req.user;
    const  ids = req.user.teams
    for (let i = 0; i < ids.length; i++) {
      await Team.findByIdAndDelete(ids[i])
    }
    
    const user = await User.findByIdAndDelete(_id)
    res.status(200).json(user);
  };
