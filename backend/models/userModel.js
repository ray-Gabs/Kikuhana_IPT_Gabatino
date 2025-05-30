const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    userId: { type: String, default: uuidv4, unique: true }, 
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);