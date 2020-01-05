const Match = require("../models/Match");
const User = require("../models/User");
const Team = require("../models/Team");

exports.getTeams = async (req, res) => {
  const team = await Team.find().populate("owner")
    .populate({
      path: "players"
    })
  res.status(200).json({
    team
  });
};

exports.getTeam = async (req, res) => {
  const {
    id
  } = req.params;
  const team = await Team.findById(id).populate("owner")
    .populate({
      path: "matchs",
    })
    .populate({
      path: "players",
    }).populate({
      path: "owner",
    })
  res.status(200).json(team);
};

exports.createTeam = async (req, res) => {
  const {
    name,
    players
  } = req.body
  const {
    user
  } = req;
  let createTeam;

  const plays = (players.split(','))



  if (req.file) {
    createTeam = {
      name,
      players: plays,
      owner: user._id,
      image: req.file.secure_url

    }


  } else {
    createTeam = {
      name,
      players: plays,
      owner: user._id
    }

  }
  const teamCreated = await Team.create(createTeam);

  for (i = 0; i < plays.length; i++) {
    const userUpdated = await User.findByIdAndUpdate(
      plays[i], {
        $push: {
          teams: teamCreated._id
        }
      }, {
        new: true
      }
    );
    req.user = userUpdated;
  }


  res.status(201).json(teamCreated);

};











exports.updateTeam = async (req, res) => {
  const {
    name,
    players,
  } = req.body
  const {
    id
  } = req.params
  const plays = (players.split(','))
  let teamUpdate

  if (req.file) {
    teamUpdate = await Team.findByIdAndUpdate(id, {
      $set: {
        name,
        players: plays,
        image: req.file.secure_url
      }

    })
  } else {
    teamUpdate = await Team.findByIdAndUpdate(id, {
      $set: {
        name,
        players: plays,
      }
    })
  }


  Team.findOneAndUpdate(id, teamUpdate)

  res.status(201).json(teamUpdate);
};














exports.deleteTeam = async (req, res) => {
  const {
    id
  } = req.params;
  await Team.findByIdAndDelete(id);
  res.status(200).json({
    message: "team deleted"
  });
};