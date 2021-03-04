const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number')
            }
        },
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

// encrypt password before save
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });
  

module.exports = mongoose.model('User', userSchema)