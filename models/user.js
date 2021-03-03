const mongoose = require('mongoose');
const crypto = require('crypto'); //hash password
const uuid = require('uuid');

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
);

// virtual field
userSchema.virtual('password')
.set((password) => {
    this._password = password
    this.salt = uuid()
    this.hashed_password = this.encryptPassword(password)
})
.get(() => {
    return this._password
})

userSchema.methods = {
    encryptPassword: ((password) => {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch (error) {
            return ''
        }
    })
}

module.exports = mongoose.model('User', userSchema)