// express is required 
const express = require('express'); 
const morgan = require('morgan')// for API Sever Loging
// this comes from a command that i ran in the terminal and being reuired here is the working after 
// some modules related to it were downloaded
require('dotenv').config();
//TESTING
const app = express();
// db config file in the config folder
const dbconfig=require("./Config/dbconfig")
//port selection online ava or go to local if not
const port = process.env.PORT || 5000;
// a log statement to check if server is running 

const usersRoute=require("./Routes/usersRoute");
const chatsRoute = require("./Routes/chatsRoute");
app.use(express.json());
app.use(morgan('dev'))
app.use("/api/users",usersRoute);
app.use("/api/chats", chatsRoute);

app.listen(port,()=>console.log(`Server running on port ${port}`))

