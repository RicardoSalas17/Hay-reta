const { Schema, model } = require('mongoose');

const matchSchema = new Schema(
  {
    matchName: String,
    matchType: String,
    teams:[{
      type: Schema.Types.ObjectId,
      ref: "Team"
    }],
    players:[{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    dateTime: String,
    localTime: String,
    description: String,
    image:String,
    lng: Number,
        lat: Number,
        direction:String,
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }],
      score:[Number,Number],
      winner:[{
        type: Schema.Types.ObjectId,
        ref: "Team"
      }],
      looser:[{
        type: Schema.Types.ObjectId,
        ref: "Team"
      }]

  },
  {
    timestamps: true,
    versionKey: false
  }
);



module.exports = model('Match', matchSchema);



