const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    mobile: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: Number,
        trim: true,
        required: true
    },
    cdate:{
        type: Date,
        trim: true,
        required: false,
        default: Date.now
    },
    udate:{
        type: Date,
        trim: true,
        required: false,
        default: Date.now
    },
    otp:{
        type: String,
        trim: true,
        required: true
    },
    location:{
        type: String,
        trim: true,
        required: false
    },
    fingerprint:{
        type: String,
        trim: true,
        required: true
    },
    domain:{
        type: String,
        trim: true,
        required: true
    }
});
// hash user password before saving into database
UserSchema.pre('save', function(next){
    // this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('User', UserSchema);