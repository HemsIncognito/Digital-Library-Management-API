const {userModel, bookModel} = require('../models');
// const {} = require('../dtos/book-dto');

exports.getAllUsers = async (req,res) => {
    const users = await userModel.find();

    if(users.length === 0){
        res.status(404).json({message: "There are no current Users"})
    }

    res.status(200).json({
        users
    })
}

exports.getUsersById = async (req,res) => {
    const {id} = req.paramas;

    const user = await userModel.findById(id);

    if(!user){
        res.status(404).json({message: "User Not Found, Please enter a valid ID"})
    }
    res.status(200).json({
        user
    })
}

exports.createUser = async(req,res) => {
    const {data} = req.body;
    const userName = data.name;
    if(!data){
        return res.status(404).json({
            message: "Invalid Data! Please provide appropriate data"
        })
    }

    const existingUser = await userModel.findOne({ name: userName });
    if (existingUser){
      return res.status(400).json({
        message: "Warning! Cannot create duplicate User",
      });
    }

    await userModel.create(data);
    const users = await userModel.find();

    return res.status(201).json({
        message: "New User was created successfully",
        users
    })
};

exports.updateUserbyId = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
            message: "Invalid Data! Please provide appropriate data"
        })
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true})

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
        message: "Changes updated",
        updatedUser
    })
};

exports.deleteUserbyId = async(req,res) => {
    const {id} = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id)

    if (!deletedUser) {
        return res.status(404).json({ message: "User with given id doesn't exist :-(" });
    }

    const users = await userModel.find();
    if(users.length === 0){
        res.status(404).json({message: "There are no current Users"})
    }

    res.status(200).json({
        message: "User Deleted Successfully",
        "Deleted User Data" : deletedUser,
        users
    })
};