// Dependencies
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const createEmployee = require('./routes/employees');
const login = require('./routes/login');
const homePage = require('./routes/homepage');
const orders= require('./routes/orders');
const trucks = require('./routes/trucks')
require('./models/Employee')
const Registration = require('./models/Registration')
//const bodyParser= require('body-parser') 

// Instantiations
const app = express();

// Requiring the express session
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

// Requiring the passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

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
app.use(expressSession);

app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    next();  
 });
 

// middleware for serving static files(css,js,images)
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));

passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());




// Routes

app.use('/employee', createEmployee);
app.use('/', login);
app.use('/', homePage);
app.use('/customer', orders);
app.use('/truck', trucks)



// logout
app.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err)=> {
          if (err) {
              console.log(err)
          } else {
              return res.redirect('/login');
          }
      })
  }
})

//Ignoring all non specified files
app.get('*', (req, res)=> {
    res.send('The route specified doesnt exist')
})



app.listen(3000, () => console.log('listening on port 3000'));