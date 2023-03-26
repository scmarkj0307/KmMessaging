const express = require('express');
const cors = require('cors');                           //for cross origin requests

const authRoutes = require("./routes/auth.js");         //requiring the route

const app = express();                                  //instance of express application

const PORT = process.env.PORT || 5000;                  //specify the port for backend

require('dotenv').config();                             //to call environment variables right inside in the node application

//set up the middleware
app.use(cors());                                        //allows cross origin request
app.use(express.json());                                //pass json payloads from the frontend to the backend
app.use(express.urlencoded());                          //this is built in middleware function in express

//create the first route
app.get('/', (req, res) => {                            //root route that receive request and response as parameters
    res.send('Hello, World!');                          //to simply respond like hello world so that we will know that the server is running
});

app.use('/auth', authRoutes);                           //adding the route to the whole server

//create a specific port for running the server that will also listen to it
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
