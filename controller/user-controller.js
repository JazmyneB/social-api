const { User } = require('../models');


const userController = {
    //Gets all Users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    //Gets a User By ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    //Creates a New User
    createUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },
    //updates User
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ __id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: 'No USER found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No Thought found with this Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));

    },
    //Deletes A User
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends:  params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;