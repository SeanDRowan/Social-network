const { Schema, model } = require('mongoose');
const userSchema = require('./thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      
    },
    // add an array of _id referencing the thought model + freinds
    // unsure about this part
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  userSchema.virtual('friendCount').get(function () {
    return `you have ${counter} friends`;
  })
  
  .set(function(v){
   counter = friends.length
    this.set({counter})
  })
);

const user = model('user', userSchema);

module.exports = user;