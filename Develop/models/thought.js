const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
reactionId: {type: Schema.Types.ObjectId,
default: () => new Types.ObjectId()},
reactionBody: {type:String, required: true, maxlength:280},
username:{ type: String, required: true},
createdAt: {
  type: Date,
  default: Date.now,
  // getter method to default timestamp on query
},
});

const thoughtSchema = new Schema(
  {
    /*assignmentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },*/
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method to default timestamp on query
    },
   username: {
      type: String,
      required:true 
    },
     reactions:[reactionSchema]
    
  },

  

);

const Thought = model('thought', thoughtSchema);
thoughtSchema.virtual('reactionCount').get(function () {
  return ` ${counter} people have reacted`;
})
.set(function(v){
  counter = reactionSchema.length
   this.set({counter})
 })

module.exports = Thought;
