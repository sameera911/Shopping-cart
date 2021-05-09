var db = require('../Models/books');

const bookList = () => {
    return db.Books.find()
        .then(books => {
            if (!books) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Error in retrieving book list."
                }
            }
            else {
                var records = db.Books.count();
                return {
                    book:books,
                    status: true,
                    statusCode: 200,
                    message: `Total ${records} books found.`
                }
            }
        })
}

const bookDetailsByIsbnNo = (isbnNo) => {
    return db.Books.findOne({ isbnNo: {$regex: new RegExp('^' + isbnNo, 'i')} })
        .then(book => {
            console.log("isbncalled"+isbnNo);
            console.log(book);
            if (!book) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "No book found with this isbn number."
                }
            }
            else {
                return {
                    bookDetails:book,
                    status: true,
                    statusCode: 200,
                    message: "Book details found."
                }
            }
        })
}
 

const bookListLowToHigh=()=>{
return db.Books.find().sort({price:1})
.then(data=>{
    console.log(data);
    if(data){
        return {
            book:data,
            status: true,
            statusCode: 200,
            message: "Listing price low to high"
        }
    }
    else{
        return {
            status: true,
            statusCode: 200,
            message: "Error in listing"
        }
    }
})
}

const bookListHighToLow=()=>{
    return db.Books.find().sort({price:-1})
    .then(data=>{
        console.log(data);
        if(data){
            return {
                book:data,
                status: true,
                statusCode: 200,
                message: "Listing high to low"
            }
        }
        else{
            return {
                status: true,
                statusCode: 200,
                message: "Error in listing"
            }
        }
    })
    }

const bookFilterByCategory = (category) => {
    return db.Books.find({ category: {$regex: new RegExp('^' + category, 'i')} })//case insensitive check
        .then(data => {
            console.log(data);
            if (data) {
                var records = db.Books.count();
                return {

                    status: true,
                    statusCode: 200,
                    message: `Total ${records} books found.`

                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "No books found on this category."
                }
            }
        })
}

const bookListByName = (bookName) => {
    return db.Books.find({ bookName: {$regex: new RegExp('^' + bookName, 'i')} })//case insensitive check
        .then(data => {
            console.log(data);
            if (data) {
                var records = db.Books.count();
                return {

                    status: true,
                    statusCode: 200,
                    message: `Total ${records} books found.`

                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "No books found on this category."
                }
            }
        })
}

const bookRegister = (isbnNo, bookName, category, dop, bookImage, description, author,inStock, price) => {
    return db.Books.findOne({ isbnNo })
        .then(data => {
            if (data) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Book already exist."
                }
            }
            else {
                const newBook = new db.Books({
                    isbnNo,
                    bookName,
                    category,
                    dop,
                    bookImage,
                    description,
                    author,
                    inStock,
                    price
                });
                newBook.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Book details recorded Successfully"
                }
            }

        })

}

const bookDelete=(isbnNo)=>{
    return db.Books.deleteOne({isbnNo: {$regex: new RegExp('^' + isbnNo, 'i')} })
    .then(book=>{
        if(book){
            console.log(book.bookName);
            return {
                status: true,
                statusCode: 200,
                message: "Book deleted successfully.."
            }
        }
        else{
            return {
                status: false,
                statusCode: 422,
                message: "Operation failed"
            }
        }
    })
}

const bookUpdate=(req,isbnNo)=>{
    var updateBook = ({
        isbnNo: req.body.isbnNo,
        bookName: req.body.bookName,
        category: req.body.password,
        gender: req.body.category,
        dop: req.body.dop,
        bookImage: req.body.bookImage,
        description: req.body.description,
        author: req.body.author,
        inStock:req.body.inStock,
        price:req.body.price
    });
    return db.Books.updateOne({isbnNo: {$regex: new RegExp('^' + isbnNo, 'i')}},updateBook)
    .then(data=>{
        if(data){
            return {
                status: true,
                statusCode: 200,
                message: "Book details updated successfully."
            }
        }
    }).catch(err => {
        if (err) {
            return {
                status: false,
                statusCode: 422,
                message: "Error in user update"
            }

        }
    })
}

module.exports = {
    bookList,
    bookDetailsByIsbnNo,
    bookRegister,
    bookFilterByCategory,
    bookListLowToHigh,
    bookListHighToLow,
    bookListByName,
    bookDelete,
    bookUpdate
}
