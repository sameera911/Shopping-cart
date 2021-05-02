const { json } = require('express');
const express = require('express');
var db = require('../Models/users');

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

const userDetails = (userName) => {
    return db.User.findOne({ userName })
        .then(user => {
            if (!user) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Error in retrieving Users' details."
                }
            }
            else {
                console.log(user);
                return {
                    status: true,
                    statusCode: 200
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
    userDetails,
    userLogin,
    userUpdate,
    userList

}