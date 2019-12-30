const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    content:String,
    image:String,
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
  },
  {
    timestamps: true,
    versionKey: false
  }
);



module.exports = model('Comment', commentSchema);
