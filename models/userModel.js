const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Name is required']
    },
    email: {
        type: 'string',
        required: [true, 'Email is required and should be unique'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, 'Password is required']
    }
},
    {
    timestamps: true
})

module.exports =  mongoose.model('User', userSchema)