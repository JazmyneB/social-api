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


//Setting api for /api/thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

    //Setting apis for /api/thought/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughId/reactions')
    .post(addReaction)
    .delete(removeReaction)


module.exports = router;