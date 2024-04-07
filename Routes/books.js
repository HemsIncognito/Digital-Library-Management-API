const express = require('express');

const { getAllBooks, getBookbyId, getAllIsuuedBooks, createBook, updateBookbyId } = require('../controllers/book-controller');

//This is how we setup a router 
const router = express.Router();

/*
Route: /books
Method: GET
Gets list of books
Parameters: None
*/ 
router.get("/", getAllBooks)

/*
Route: /books/:id
Method: GET
Get a book by ID
Parameters: id
*/ 
router.get("/:id", getBookbyId)

/*
Route: /books/issued
Method: GET
Get all issued books
Parameters: None
*/ 
router.get("/issued/free", getAllIsuuedBooks)

/*
Route: /books
Method: POST
Add a new book
Parameters: None
*/ 
router.post("/", createBook)

/*
Route: /books/id
Method: PUT
Update a book
Parameters: id
*/ 
router.put("/:id", updateBookbyId)

module.exports = router