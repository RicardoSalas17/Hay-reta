const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    image: {
      type: String,
      default: 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
     },
    matchs: [{
      type: Schema.Types.ObjectId,
      ref: "Match",
    }],
    teams:[{
      type: Schema.Types.ObjectId,
      ref: "Team",
    }],
  },
  
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)

