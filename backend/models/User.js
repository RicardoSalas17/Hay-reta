const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    image: String,
    matchs: [{
      type: Schema.Types.ObjectId,
      ref: "Match",
    }],
    teams:[{
      type: Schema.Types.ObjectId,
      ref: "Teams",
    }],
    matchs:[{
      type: Schema.Types.ObjectId,
      ref: "Teams",
    }]
  },
  
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)

