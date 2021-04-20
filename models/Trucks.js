const mongoose = require('mongoose');

const trucksSchema = new mongoose.Schema({ 
    regno: {
        type: String,
        required: 'Please Registration Number'
    }


})


















module.exports = mongoose.model('Trucks', trucksSchema);

