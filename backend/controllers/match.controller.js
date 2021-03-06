const Match = require("../models/Match");
const User = require("../models/User");
const Team = require("../models/Team");

exports.getMatchs = async (req, res) => {
  const match = await Match.find().populate("owner")
   .populate({
    path:"Team"}).populate("players")
  res.status(200).json({ match });
};

exports.getMatch = async (req, res) => {
  const { id } = req.params;
  const match = await Match.findById(id).populate("owner").populate("players").populate("teams")
  .populate({
  path:"comments",
  populate:{ 
  path: "owner",
  model:"User",
  }})
  
  res.status(200).json(match);
};

exports.createMatch = async (req, res) => {
  const { matchName,
    dateTime,
    localTime,
    description,
    lng,
    lat,
    direction,
    matchType,
    players,
    teams
          } = req.body


let p
if(players.includes(",")){
  p=(players.split(','))
  
}else{
  p=players
}


let t
if(teams.includes(",")){
  t=(teams.split(','))
}else{
  t=teams
}


  const { user } = req;
  let createMatch;


  if (req.file) {
    createMatch =  {
      matchName,
      dateTime,
      players:p,
      teams:t,
      localTime,
      description,
      lng,
      lat,
      direction,
      matchType,
    owner: user._id,
    image: req.file.secure_url
      
    }
    
  }else {
    createMatch ={
      matchName,
      dateTime,
      localTime,
      description,
      lng,
      lat,
      direction,
      matchType,
      players:p,
      teams:t,
    owner: user._id
    } 
    
    }
    const matchCreated = await Match.create(createMatch);



if(players.includes(",")){
  for(i=0; i<p.length; i++){
    const userUpdated = await User.findByIdAndUpdate(
      p[i],
      { $push: { matchs:matchCreated._id } },
      { new: true }
    );
    let actus = await User.findById(p[i]) 
    actus = userUpdated
  }
} else{
  const userUpdated = await User.findByIdAndUpdate(
    players,
    { $push: { matchs:matchCreated._id } },
    { new: true }
  );
  let actus = await User.findById(players) 
  actus = userUpdated
}


if(teams.includes(",")){
  for(i=0; i<t.length; i++){
    const teamUpdated =await Team.findByIdAndUpdate(
      t[i],
      { $push: { matchs:matchCreated._id } },
      { new: true }
    );
    let acttea = await Team.findById(t[i]) 
    acttea = teamUpdated
  }
} else{
  const teamUpdated =await Team.findByIdAndUpdate(
    teams,
    { $push: { matchs:matchCreated._id } },
    { new: true }
  );
  let acttea = await Team.findById(Teams)
  acttea = teamUpdated

}

  res.status(201).json(matchCreated);
};




exports.updateMatch = async (req, res) => {
  const { matchName,
    dateTime,
    localTime,
    description,
    lng,
    lat,
    direction,
    matchType,
    score,
    winner,
    looser
          } = req.body
          const { id } = req.params
          let matchUpdate

  if (req.file) {
     matchUpdate = await Match.findByIdAndUpdate(id,{
      $set:
    { matchName,
      dateTime,
      localTime,
      description,
      lng,
      lat,
      direction,
      matchType,
    image: req.file.secure_url}
      
    })}
  else {
     matchUpdate = await Match.findByIdAndUpdate(id,{
    $set:
   {
    matchName,
    dateTime,
    localTime,
    description,
    lng,
    lat,
    direction,
    matchType,
    score,
    winner,
    looser
    } 
  })
}

Match.findOneAndUpdate(id, matchUpdate) 

  res.status(201).json(matchUpdate);
};






exports.deleteMatch = async (req, res) => {
  const { id } = req.params;
  await Match.findByIdAndDelete(id);
  res.status(200).json({ message: "match deleted" });
};