const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const teamSchema = new Schema(
  {
    name: String,
    image: String,
    matchs: [{
      type: Schema.Types.ObjectId,
      ref: "Match",
    }],
    players:[{
      type: Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('Team', teamSchema)
