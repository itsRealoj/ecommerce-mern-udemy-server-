const mongoose = require('mongoose');
const crypto = require('crypto'); //hash password
const uuid = require('uuid');
const { timeStamp } = require('console');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String,
    role: {
        type: String,
        default: 0,
    },
    history: {
        type: Array,
        default: []
    },
}, 
{timestamps: true}
)