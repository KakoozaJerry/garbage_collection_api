const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const registrationSchema = new mongoose.Schema({ 
    firstname: {
        type: String,
        required: 'Please Enter First name'
    },
    lastname: String,
    email:{
        type: String,
        unique: true,
        required: 'Please Enter Email' 
    }
});


registrationSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model('Registration', registrationSchema);