const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
  RemoveAll
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:_id').get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:_id/reaction').post(addReaction);

router.route('/:_id/reaction/:reactionId').delete(removeReaction);



module.exports = router;
