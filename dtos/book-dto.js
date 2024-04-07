//Data Transfer Object
class issuedBook {
    _id; // _ means that the id is present in the db itself, we don't need to provide explicitly 
    name; genre; price; publisher;
    issuedDate; returnDate; issuedBy;

    constructor(user){
        this._id = user.bookData._id;
        this.name = user.bookData.name;
        this.genre = user.bookData.genre;
        this.price = user.bookData.price;
        this.publisher = user.bookData.publisher;
        this.issuedBy = user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }

}

module.exports = issuedBook;