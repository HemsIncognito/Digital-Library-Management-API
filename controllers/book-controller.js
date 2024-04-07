const {userModel, bookModel} = require('../models');
const {issuedBook} = require('../dtos/book-dto');

exports.getAllBooks = async (req, res) => {
    const books = await bookModel.find();

    if(books.length === 0){
        return res.status(404).json({ message: "No Books avialable :-( "})
    }

    return res.status(200).json({
        books
    })
};

exports.getBookbyId = async (req, res) => {
    const{id} = req.params;

    const book = await bookModel.findById(id);

    if(!book){
        return res.status(404).json({message: "No such Book Found :-( "})
    }
    return res.status(200). json({
        book
    })
};

exports.getAllIsuuedBooks = async(req,res) => {

    const users = await userModel.find({
        issuedBook: {$exists: true}
    }).populate("bookData")

    const issuedBooks = users.map((each) => new issuedBook(each));

    if(issuedBooks.length === 0){
        return res.status(404).json({message: "No Books issued yet "})
    }
    return res.status(200).json({
        issuedBooks
    })
};

exports.createBook = async(req,res) => {
    const {data} = req.body;
    const bookName = data.name;
    if(!data){
        return res.status(404).json({
            message: "Invalid Data! Please provide appropriate data"
        })
    }

    const existingBook = await bookModel.findOne({ name: bookName });
    if (existingBook){
      return res.status(400).json({
        message: "Warning! Duplicate Book Entered",
      });
    }

    await bookModel.create(data);
    const books = await bookModel.find();

    return res.status(201).json({
        message: "The Book was added to the Library",
        books
    })
};

exports.updateBookbyId = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
            message: "Invalid Data! Please provide appropriate data"
        })
    }

    const updatedBook = await bookModel.findByIdAndUpdate(id, data, {new: true})

    if (!updatedBook) {
        return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({
        message: "Changes updated",
        updatedBook
    })
};