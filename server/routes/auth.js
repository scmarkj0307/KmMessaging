const express = require('express');                                     //requiring express

const { signup, login } = require('../controllers/auth.js');            //import the signup and login function from the controller

const router = express.Router();                                        //getting router for the express

//create two post routes that will send the data from the frontend to the backend that only the post route can send a payload
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;