const express = require('express');
const {users} = require("../data/users.json");

const router = express.Router();

/*
Route: /users
Method: GET
Gets user list in json, public info
Parameters: None
*/ 
router.get("/", (req,res) => {
    res.status(200).json({
        users 
    })
})

/*
Route: /users/:id
Method: GET
Get a user by ID
Parameters: id
*/ 
router.get("/:id", (req,res) => {
    const {id} = req.params;

    if(id === "") return res.status(400).json({
        message: "Enter a valid ID number"
    })

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            message : "User not found :-("
        })
    }
    return res.status(200).json({
        user
    })
})

/*
Route: /users
Method: POST
Add a new user
Parameters: None
*/ 
router.post("/", (req,res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const unique = users.find((each) => each.id === id);
    if(unique){
        return res.status(404).json({
            message: "User with the given ID already exists"
        })
    }
    users.push({id, name, surname, email,subscriptionType, subscriptionDate})
    return res.status(201).json({
        message: "The user was added to the list"
    })
})

/* 
Route: /users/:id
Method: PUT
Updating a user data by their ID
Paramaters: id 
*/
router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(id === "") return res.status(400).json({
        message: "Enter a valid ID number"
    })

    const unique = users.find((each) => each.id === id);

    if(!unique){
        return res.status(404).json({
            message: "User with given id doesn't exist :-("
        })
    }
    const updatedUser = users.map((each)=>{
        if(each.id === id){
            return {...each,
            ...data}
        }
        return each;
    })
    return res.status(200).json({
        message: "Changes updated",
        updatedList: updatedUser
    })
})

/* 
Route: /users/:id
Method: DELETE
Deleting a User
Paramaters: id 
*/
router.delete("/:id", (req,res) => {
    const {id} = req.params;

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            message: "User with given id doesn't exist :-("
        })
    }

    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(200).json({
        message: "Deleted Successfully",
        users
    })
})

/* 
Route: /users/subscription-details/:id
Method: GET
Provides subscription details
Paramaters: id 
*/
router.get("/subscription-details/:id", (req,res) => {
    const {id} = req.params;

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            message: "User with given id doesn't exist :-("
        })
    }

    //Subscription Expiration Logic

    //Prerequisites
    const dateInDays = (data = "") => {
        let date;
        if(data !== ""){
            date = new Date(data);
        }
        else{
            date = new Date();
        }

        return Math.floor(date / 1000*60*60*24); //day = 1/ms*sec*min*hours of date
    }
    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date += 90;
        }
        else if(user.subscriptionType === "Standard"){
            date += 180;
        }
        else if(user.subscriptionType === "Premium"){
            date += 365;
        }
        return date;
    }

    //The LOGIC
    let returnDate = dateInDays(user.returnDate);
    let currentDate = dateInDays();
    let subscriptionDate = dateInDays(user.subscriptionDate);
    let subscriptionExpiryDate = subscriptionType(subscriptionDate);

    const data = { ...user, 
        subscriptionExpired: subscriptionExpiryDate < currentDate,
        subscriptionDaysLeft: (subscriptionExpiryDate <= currentDate) ? 0 : subscriptionExpiryDate-currentDate,
        fine: returnDate < currentDate ? subscriptionExpiryDate <= currentDate ? 200 : 100 : 0

    }
    return res.status(200).json({
        data
    })
    
})

module.exports = router;