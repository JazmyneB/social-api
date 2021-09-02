const { User } = require('../models');


const userController = {
    //Gets all Users
    getAllUsers(req, res) {
        User.find({})
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
            path: 'thought',
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
    //Deletes A User
    deleteUser({ params }, res){
        User.findOneAndDelete({ _ide: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;