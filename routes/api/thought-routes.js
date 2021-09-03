const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    addReaction,
    deleteThought,
    removeReaction
} = require('../../controller/thought-controller');


//Setting api for /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

    //Setting apis for /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


//Setting for /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughId/reactions')
    .post(addReaction)
    .delete(removeReaction)


module.exports = router;