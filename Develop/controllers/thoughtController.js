// ObjectId() method for converting studentId string into an ObjectId for querying database
const  ObjectId  = require('mongoose').Types;
const  Thought  = require('../models/thought');
const  User = require('../models/user');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params._id })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const newthought = await Thought.create(req.body);
       return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push:  {thoughts: newthought}},
        { new: true },
        res.json(newthought)
      );
      
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params._id });
      User.findOneAndUpdate(
        {thoughts:req.params._id},
        {$pull:{thoughts:req.params._id}},
        {new:true}
      )
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
  res.json('thought deleted')
      /*await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Course and students deleted!' });*/
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // new reaction
  async addReaction(req, res){
    try{
    const reaction = await Thought.findOneAndUpdate(
      {_id:req.params._id},
      {$addToSet:{reactions:req.body}},
      {runValidators:true, new:true}
    )
  
      if (!reaction){
        return req.status(404).json({message:'no thought with this ID'})
      }
      res.json(reaction)
    
  }catch(err){ res.status(500).json(err)
  }},
  //remove reaction
  async removeReaction(req,res){
    try{
    reaction = await Thought.findOneAndUpdate(
    {_id:req.params._id},
    {$pull:{reactions:{reactionId:req.params.reactionId}}},
    {runValidators:true, new:true}
  )
 
    if (!reaction){
      return req.status(404).json({message:'no thought with this ID'})
    }
    res.json(reaction)
  
}catch(err) {res.status(500).json(err)}}};
