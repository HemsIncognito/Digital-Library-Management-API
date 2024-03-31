const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

//This is how we setup a router 
const router = express.Router();

/*
Route: /books
Method: GET
Gets list of books
Parameters: None
*/ 
router.get("/", (req,res) => {
    res.status(200).json({
        books 
    })
})

/*
Route: /books/:id
Method: GET
Get a book by ID
Parameters: id
*/ 
router.get("/:id", (req,res) => {
    const {id} = req.params;

    if(id === "") return res.status(400).json({
        message: "Enter a valid ID number"
    })

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            message : "Book not found :-("
        })
    }
    return res.status(200).json({
        book
    })
})

/*
Route: /books/issued
Method: GET
Get all issued books
Parameters: None
*/ 
router.get("/issued/free", (req,res) => {
    const hasIssuedBooks = users.filter((each) => {
        if(each.issuedBook) return each
    })

    const issuedBooks = []; // Data on which books are issued to someone
    hasIssuedBooks.forEach((each) => {
        //cross-checking whether the book's id is the same as issuedBook
        const book = books.find((book) => book.id === each.issuedBook);

        //We copy the data required into books to push it into array
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })

    if(issuedBooks.length === 0){
        return res.status(404).json({
            message: "No Books isssued yet"
        })
    }

    return res.status(200).json({
        issuedBooks
    })
})

/*
Route: /books
Method: POST
Add a new book
Parameters: None
*/ 
router.post("/", (req,res) => {
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            message: "Invalid Data! Please provide proper data"
        })
    }

    const book = books.find((each) => each.id === data.id);
    if(book){
        return res.status(404).json({
            message: "Book already exists"
        })
    }

    books.push(data);
    return res.status(201).json({
        message: "The Book was added to the Library",
        books
    })
})

/*
Route: /books/id
Method: PUT
Update a book
Parameters: id
*/ 
router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(id === "") return res.status(400).json({
        message: "Enter a valid ID"
    })

    const book = users.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            message: "Book with given id doesn't exist :-("
        })
    }
    const updatedBook = users.map((each)=>{
        if(each.id === id){
            return {...each, ...data}
        }
        return each;
    })
    return res.status(200).json({
        message: "Changes updated",
        updatedList: updatedBook
    })
})


module.exports = router