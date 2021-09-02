const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    removeFriend
} = require('../../controller/user-controller');

//Set up GET ALL and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


//Set Up GET ONE, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);


module.exports = router;