const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const registrationSchema = new mongoose.Schema({ 
    firstname: {
        type: String,
        required: 'Please Enter First name'
    },
    lastname: {
        type: String,
        required: 'Please Enter Last name'
    },
    email: {
        type: String,
        required: 'Please Enter Email'
    },
    password: {
        type: String,
        required: 'Please Enter Password'
    }
})


registrationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Registration', registrationSchema);