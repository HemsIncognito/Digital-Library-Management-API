const express = require('express');

const { getAllUsers, getUsersById, createUser, updateUserbyId, deleteUserbyId } = require('../controllers/user-controller');

const router = express.Router();

/*
Route: /users
Method: GET
Gets user list in json, public info
Parameters: None
*/ 
router.get("/", getAllUsers)

/*
Route: /users/:id
Method: GET
Get a user by ID
Parameters: id
*/ 
router.get("/:id", getUsersById)

/*
Route: /users
Method: POST
Add a new user
Parameters: None
*/ 
router.post("/", createUser)

/* 
Route: /users/:id
Method: PUT
Updating a user data by their ID
Paramaters: id 
*/
router.put("/:id", updateUserbyId)

/* 
Route: /users/:id
Method: DELETE
Deleting a User
Paramaters: id 
*/
router.delete("/:id", deleteUserbyId)

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