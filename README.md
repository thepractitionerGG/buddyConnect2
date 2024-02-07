#### BUDDY CONNECT APP###

This application has two parts
1. Client
2. Server

Client side will have users logging in from the browser while server maintains the sockets and the connection to the mongodb.

### HOW TO INSTALL THE APP ###

Server side:
npm i nodemon
npm i cloudinary
npm i socket.io
npm i mongoose

Client side:
npm i cloudinary
npm install moment --save
npm i socket.io-client
npm i emoji-picker-react

The client will run on port 3000 while the server will run on 5003.

Too run server, the command is 

nodemon server/server

To run the client, the command is

cd Client
npm run start