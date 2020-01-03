const Match = require("../models/Match");
const User = require("../models/User");
const Team = require("../models/Team");

exports.getTeams = async (req, res) => {
  const team = await Team.find().populate("owner")
   .populate({
    path:"Team"})
  res.status(200).json({ team });
};

exports.getTeam = async (req, res) => {
  const { id } = req.params;
  const team = await Team.findById(id).populate("owner")
  .populate({
  path:"comments",
  populate:{ 
  path: "owner",
  model:"User",
  }})
  
  res.status(200).json(team);
};

exports.createTeam = async (req, res) => {
  const { name,
    players
          } = req.body
  const { user } = req;
  let createMatch;

 const plays = (players.split(','))



  if (req.file) {
    createMatch =  {
      name,
    players:plays,
    owner: user._id,
    image: req.file.secure_url
    
  }

    
  }else {
    createMatch ={
      name,
    players:plays,
    owner: user._id
    } 
    
    }
    const matchCreated = await Team.create(createMatch);
  const userUpdated = await User.findByIdAndUpdate(
    user._id,
    { $push: { teams:matchCreated._id } },
    { new: true }
  );

  req.user = userUpdated;

  res.status(201).json(matchCreated);
  console.log(matchCreated)

};




exports.updateTeam = async (req, res) => {
  const {name,
    players,
    
          } = req.body
          const { id } = req.params
          let matchUpdate

  if (req.file) {
     matchUpdate = await Team.findByIdAndUpdate(id,{
      $set:
    { name,
      players,
    image: req.file.secure_url}
      
    })}
  else {
     matchUpdate = await Team.findByIdAndUpdate(id,{
    $set:
   {
    name,
    players

    } 
  })
}

Team.findOneAndUpdate(id, matchUpdate) 

  res.status(201).json(matchUpdate);
};






exports.deleteTeam = async (req, res) => {
  const { id } = req.params;
  await Team.findByIdAndDelete(id);
  res.status(200).json({ message: "team deleted" });
};