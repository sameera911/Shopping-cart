const express = require('express');
const bookService = require('./services/bookServices');
const userService = require('./services/userServices');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.use(session({
    secret: 'randonsecurestring',
    resave: false,
    saveUninitialized: false
}))

const logMiddleware = (req, res, next) => {
    console.log(req.body);
    next()
}
app.use(logMiddleware);

const authMiddleware = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
            status: true,
            statusCode: 401,
            message: "Please log in"
        })
    }
    else {
        next()
    }
}

// users controls....
app.get('/', (req, res) => {
    userService.userList().then(result => { res.status(result.statusCode).json(result) });
});

// app.get('/:email', (req, res) => {
//     userService.useremail(req.params.email).then(result => { res.status(result.statusCode).json(result) });
// });


app.get('/user/userdetails/:userName', (req, res) => {
    //console.log("hello");
    userService.userDetailsView(req.params.userName).then(result => { res.status(result.statusCode).json(result) });
});

app.post('/userRegister', (req, res) => {
    userService.userRegister(req.body.custName, req.body.userName, req.body.password, req.body.gender, req.body.dob, req.body.address, req.body.phoneNo, req.body.email)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.post('/useritem/addToCart', (req, res) => {
    console.log("server hello");
    userService.addToCart(req.body.userName,req.body.isbnNo,req.body.noOfCopies)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.get('/viewCart/:userName',(req,res)=>{
    userService.viewCartItems(req.params.userName)
    .then(result => { res.status(result.statusCode).json(result) });
})

app.get('/getCartAmount/:userName',(req,res)=>{
    userService.getTotalAmount(req.params.userName)
    .then(result => { res.status(result.statusCode).json(result) });
})

app.post('/userLogin', (req, res) => {
    userService.userLogin(req, req.body.userName, req.body.password)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.delete('/userDelete/:userName', authMiddleware, (req, res) => {
    userService.userDelete(req.params.userName)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.put('/userUpdate/:userName', authMiddleware, (req, res) => {
    userService.userUpdate(req, req.params.userName)
        .then(result => { res.status(result.statusCode).json(result) });
});

// book controlls...
app.get('/books/bookList', (req, res) => {
    bookService.bookList().then(result => { res.status(result.statusCode).json(result) });
});

app.get('/books/:category', (req, res) => {
    bookService.bookFilterByCategory(req.params.category)
    .then(result => { res.status(result.statusCode).json(result) });
});

app.get('/books/detailsByIsbn/:isbnNo', (req, res) => {
    bookService.bookDetailsByIsbnNo(req.params.isbnNo)
    .then(result => { res.status(result.statusCode).json(result) });
});

// app.get('/books/DetailsByClick/:isbnNo', (req, res) => {
//     bookService.bookDetailsByclick(req.params.isbnNo)
//     .then(result => { res.status(result.statusCode).json(result) });
// });

app.get('/books/listByPrice/lowToHigh', (req, res) => {
    bookService.bookListLowToHigh().then(result => { res.status(result.statusCode).json(result) });
});

app.get('/books/listByPrice/highToLow', (req, res) => {
    bookService.bookListHighToLow().then(result => { res.status(result.statusCode).json(result) });
});

app.get('/books/listByName/:bookName', (req, res) => {
    bookService.bookListByName(req.params.bookName).then(result => { res.status(result.statusCode).json(result) });
});

app.post('/books/bookRegister', (req, res) => {
    bookService.bookRegister(req.body.isbnNo, req.body.bookName, req.body.category,req.body.dop, req.body.bookImage, req.body.description, req.body.author,req.body.inStock, req.body.price)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.delete('/books/bookDelete/:isbnNo', (req, res) => {
    bookService.bookDelete(req.params.isbnNo)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.put('/books/bookUpdate/:isbnNo', (req, res) => {
    bookService.bookUpdate(req, req.params.isbnNo)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.listen(3000, () => {
    console.log("server started at port 3000");
});