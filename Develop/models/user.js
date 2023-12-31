const { Schema, model } = require('mongoose');


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
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      
    },
    // add an array of _id referencing the thought model + freinds
    // unsure about this part
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }],
    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },]
  },{toJSON:{
    virtuals: true
  },
id:false}
);
userSchema.virtual('friendCount').get(function(){
  return this.friends.length
}) 
const User = model('user', userSchema);



module.exports = User;
