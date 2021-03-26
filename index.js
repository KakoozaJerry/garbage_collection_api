// Dependencies
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const createEmployee = require('./routes/createEmployee');
const login = require('./routes/login');
const employeeList = require('./routes/employeeList');
const homePage = require('./routes/homepage');
const createOrder= require('./routes/createOrder');
const orderList = require('./routes/orderList');
const registerFrontDesk = require('./routes/registerFrontDesk')
require('./models/Employee')
//const bodyParser= require('body-parser') 

// Instantiations
const app = express();


// Configurations
app.set('view engine', 'pug');
app.set('views', './views');

//Database Connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


// Middleware
// in the new version, bodyParser is incorparated in the express new version
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    next();  
 });
 

// middleware for serving static files(css,js,images)
app.use(express.static('public'));




// Routes

app.use('/employee', createEmployee);
app.use('/', login);
app.use('/', employeeList);
app.use('/', homePage);
app.use('/', createOrder);
app.use('/', orderList);
app.use('/', registerFrontDesk)


//Ignoring all non specified files
app.get('*', (req, res)=> {
    res.send('The route specified doesnt exist')
})



app.listen(3000, () => console.log('listening on port 3000'));