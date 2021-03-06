const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PeopleRouter = require('./routes/people');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri,{
    useNewUrlParser :true,
    useCreateIndex: true,
    useUnifiedTopology:true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connection established.');
});

app.use('/people', PeopleRouter);

app.listen(port, ()=> {
    console.log('Server is running at port: ' + port);
});