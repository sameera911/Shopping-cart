const { json } = require('express');
const express = require('express');
var db = require('../Models/users');
var cartdb = require('../Models/carts');
var bookdb = require('../Models/books');
//var user=require('../Models/users');

let currentUser;

const userRegister = (custName, userName, password, gender, dob, address, phoneNo, email) => {
    console.log("in Register");
    return db.User.findOne({ userName })
        .then(user => {
            if (user) {
                if (password == user.password) {

                    return {
                        status: false,
                        statusCode: 422,
                        message: "User already exist. Please Login.."
                    }
                }
                else {
                    return {
                        status: false,
                        statusCode: 422,
                        message: `Username ${userName} is not available.`
                    }
                }
            }


            const newUser = new db.User({
                custName,
                userName,
                password,
                gender,
                dob,
                address,
                phoneNo,
                email
            });
            newUser.save();
            return {
                status: true,
                statusCode: 200,
                message: "Registration Successful"
            }

        })
}

const addToCart = (userName, isbnNo, noOfCopies) => {
    console.log(Date());

    // var userCart = new cartdb.Carts({
    //     userName,
    //     isbnNo,
    //     noOfCopies,
    //     amount:
    //     date: Date()
    // });
    // userCart.save();
    // bookdb.Books.updateOne(
    //     {
    //         isbnNo: isbnNo,
    //         inStock: { $gt: 0 }
    //     }, {
    //     $inc: {
    //         inStock: -1
    //     }
    // }

    // );


    return bookdb.Books.find({ isbnNo: isbnNo }, { price: 1, inStock: 1, _id: 0 })

        .then(data => {
            if (data) {
                console.log(data);
                // var decstock=(data[0].inStock)-1;
                // console.log(decstock);
                // data[0].inStock=decstock;
                // console.log(data);
                // bookdb.Books.updateOne(
                //         {
                //             isbnNo: isbnNo,
                //             inStock: "$decStock"
                //         });
                var totPrice = (noOfCopies * data[0].price);
                console.log(totPrice);
                var userCart = new cartdb.Carts({
                    userName,
                    isbnNo,
                    noOfCopies: noOfCopies,
                    amount: totPrice,
                    date: Date()
                });

                userCart.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Item added to your cart",
                    amount: totPrice
                }

            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Book not found"
                }
            }
        })
}

const getTotalAmount = (userName) => {
    return cartdb.Carts.aggregate([        //aggregate function to sum amounts from carts table
        { $match: { userName: userName } },
        {
            $group: {
                _id: userName,
                total: {
                    $sum: "$amount"
                }
            }
        }

    ])
        .then(data => {
            if (data) {
                // console.log(data[0].total);
               var tot=data[0].total;
                return {
                    sum: tot,
                    status: true,
                    statusCode: 200,
                    message: "Amount found",
                }
            }
            else{
                return {
                    status: false,
                    statusCode: 422,
                    message: "Cart is empty"
                }
            }

        })

}

const viewCartItems = (userName) => {

    return cartdb.Carts.find({ userName })
        .then(data => {
            if (data) {
                console.log(data.isbnNo);
                return {

                    items: data,
                    status: true,
                    statusCode: 200,
                    message: "Items found",
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Cart is empty"
                }
            }
        })
}

////////


//////////
// const useremail = (email) => {
//     return db.User.findOne({ email })
//         .then(em => {
//             console.log(em);
//             if (em) {
//                 return {
//                     status: false,
//                     statusCode: 422,
//                     message: `Email is invalid or already taken.`
//                 }
//             }
//         })
// }

//     if (email == user.email) {
//         return {
//             status: false,
//             statusCode: 422,
//             message: `Email ${email} is invalid or already taken.`
//         }
//     }
//     else if (userName == user.userName) {
//         return {
//             status: false,
//             statusCode: 422,
//             message: `Username ${userName} is not available.`
//         }
//     }

// }


const userList = () => {
    return db.User.find()
        .then(user => {
            if (user) {
                var records = db.User.count();
                return {
                    userlist: user,
                    status: true,
                    statusCode: 200,
                    message: `Total ${records} records found.`
                }
            }
        }).catch(err => {
            if (err) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Error in retrieving Users' list."
                }
            }
        })
}

const userDetailsView = (userName) => {
    // console.log(userName);
    return db.User.find({ userName })
        .then(user => {
            if (user) {
                console.log(user[0]);
                return {
                    usdata: user[0],
                    status: true,
                    statusCode: 200,
                    message: "Success"
                }

            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Error in retrieving Users' details."
                }
            }
        })
}



const userLogin = (req, userName, password) => {
    return db.User.findOne({ userName, password })
        .then(user => {
            if (user) {
                req.session.currentUser = user.userName;
                return {
                    status: true,
                    statusCode: 200,
                    message: "login Successful",
                    userName: user.userName,
                    custName: user.custName
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "User does not exist with provided account details"
                }
            }
        })
}

const userDelete = (userName) => {
    return db.User.deleteOne({
        userName
    }).then(user => {
        if (!user) {
            return {
                status: false,
                statusCode: 422,
                message: "Operation failed"
            }
        }
        console.log(userName);
        return {
            status: true,
            statusCode: 200,
            message: "Account deleted successfully.."
        }
    })
}

const userUpdate = (req, userName) => {
    console.log(userName);
    var updateUser = ({
        custName: req.body.custName,
        userName: req.body.userName,
        password: req.body.password,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        email: req.body.email
    });
    return db.User.updateOne({ userName }, updateUser)
        .then(() => {
            return {
                status: true,
                statusCode: 200,
                message: "Your account updated successfully."
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
    userRegister,
    userDelete,
    userDetailsView,
    userLogin,
    userUpdate,
    userList,
    addToCart,
    viewCartItems,
    getTotalAmount

}