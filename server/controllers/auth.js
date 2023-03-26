//initialize the packages needed
const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');   

require('dotenv').config();             //To import the data in .env file

//Random variable to hide the api key,secret and app id for the security of the stream account
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const  signup = async (req,res) => {                                             //req is going to contain info what your sending to the frontend , also specify the function as async since we are using await
    try {   
        const { fullName, username, password, phoneNumber } = req.body;         //compressing the data into req.body

        const userId = crypto.randomBytes(16).toString('hex');                  //creating random userId per user by creating random crypto string

        const serverClient = connect(api_key, api_secret, app_id);              //connection to your stream account server client

        const hashedPassword = await bcrypt.hash(password, 10);                 //create a password for the server client

        const token = serverClient.createUserToken(userId);                     //creating a token for the user

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber }); //return the data to the frontend

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};





const login = async (req, res) => {
    try {
        const { username, password } = req.body;                            
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });                  //To query if there is same username in the database

        if(!users.length) return res.status(400).json({ message: 'User not found' });   //If not matched on the users in the database

        const success = await bcrypt.compare(password, users[0].hashedPassword);        //Comparing the username to the password

        const token = serverClient.createUserToken(users[0].id);                        //Creating a token for the user

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {ads
        console.log(error);

        res.status(500).json({ message: error });
    }
};


module.exports = { signup, login }
