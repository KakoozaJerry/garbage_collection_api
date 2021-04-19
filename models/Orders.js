const mongoose = require('mongoose');


const ordersSchema = new mongoose.Schema({ 
    firstname: {
        type: String,
        required: 'Please Enter first name'
    },
    lastname: {
        type: String,
        required: 'Please Enter last name'
    },
    phone: {
        type: String,
        required: 'Please Enter Phone Number'
    },
    nin: String,
    location: String,
    servicerequest: String,
    requesttype: String,
    date: Date


})












module.exports = mongoose.model('Orders', ordersSchema);
