const express = require('express');
//const bodyParser= require('body-parser') 
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
// in the new version, bodyParser is incorparated in the express new version

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req,res) => {
    res.send('Homepage! Hello world.')
});



app.get('/hello', (req, res) => {
    res.render('view');
});







app.listen(3000, () => console.log('listening on port 3000'));