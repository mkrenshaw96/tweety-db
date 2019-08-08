require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./routes/user');

//CONNECT TO OUR MONGODB DATABASE, PASS IN OUR URL (ATLAS) AND URLNEWPARSER (ALWAYS USE)
mongoose.connect(`${process.env.ATLAS}`, { useNewUrlParser: true });

//SET THE MONGOOSE CONECTION TO A DB VARIABLE FOR EASIER REFERENCE LATER
const db = mongoose.connection;

//CATCHES ANY ERRORS THAT MIGHT OCCUR IN OUR DATABASE ???
db.on('error', (err) => console.log(err))

//ONLY RUNS ONCE WHEN OUR DATABASE IS CONNECTING
db.once('open', () => console.log(`🦠 Connected to database 🦠`))

app.use(express.json());
app.use('/user', Users);

app.listen(process.env.PORT, () => console.log(`🚀 Server is listening on port ${process.env.PORT} 🚀`))