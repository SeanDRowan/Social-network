const  Thought  = require('../models/thought');
const  User = require('../models/user');


module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params._id})
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({path:'friends'});
       
        
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
   
    
      res.json(user,
       );
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const course = await User.findOneAndDelete({ _id: req.params._id });

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }
      return res.json('user deleted')
      /*await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Course and students deleted!' });*/
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateUser(req, res) {
    try {
      const course = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        return res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res){
    try{
      const newfriend = await User.findOneAndUpdate(
       {_id:req.params._id},
       {$push:{friends:req.params.friendId}},
       {new:true}
     )
     
       if (!newfriend){
         return req.status(404).json({message:'no user with this ID'})
       }
      return res.json(newfriend)
     
   }catch{((err) => res.status(500).json(err));}},
   
   async removeFriend(req, res){
    try{
     const nofriend= await User.findOneAndUpdate(
       {_id:req.params._id},
       {$pull:{friends:req.params.friendId}},
       {new:true}
     )
     
       if (!nofriend){
         return req.status(404).json({message:'no user with this ID'})
       }
       res.json(nofriend)
     
    }catch{((err) => res.status(500).json(err))
   }
}}
