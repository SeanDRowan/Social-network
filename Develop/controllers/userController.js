const  User = require('../models/user');


module.exports = {
  // Get all courses
  async getUsers(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleUser(req, res) {
    try {
      const course = await User.findOne({ _id: req.params._id })
        .select('-__v');

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteUser(req, res) {
    try {
      const course = await User.findOneAndDelete({ _id: req.params._id });

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Course and students deleted!' });
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
};