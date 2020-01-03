const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const teamSchema = new Schema(
  {
    name: String,
    image: {
      type: String,
      default: 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
     },
    matchs: [{
      type: Schema.Types.ObjectId,
      ref: "Match",
    }],
    players:[{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  },
  
  
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('Team', teamSchema)
