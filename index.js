// Dependencies
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes')
//const bodyParser= require('body-parser') 

// Instantiations
const app = express();


// Configurations
app.set('view engine', 'pug');
app.set('views', './views');


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

app.use('/employee', employeeRoutes);

/* app.use('/', (req,res) => {
    res.send('Homepage! Hello world.')
});

app.get('/createEmployee', (req, res) => { 
    res.render('createEmployee', {title: 'Employee'});
})

app.get('/createOrder', (req, res) => { 
    res.render('createOrder', {title: 'Create Order'});
})
 */
/* app.post('/createEmployee', (req,res)=>{
    console.log(req.body)
    res.send("Data successfully captured") 
})

app.get('/hello', (req, res) => {
    res.render('view');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/employees', (req, res) => {
    res.render('index');
}); */

app.get('*', (req, res)=> {
    res.send('The route specified doesnt exist')
})









app.listen(3000, () => console.log('listening on port 3000'));