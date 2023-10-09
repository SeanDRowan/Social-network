const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/courses
router.route('/').get(getUsers)
.post(createUser)

// /api/courses/:courseId
router
  .route('/:_id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


  router.route('/:_id/friends/:friendId').post(addFriend).delete(removeFriend);
module.exports = router;
