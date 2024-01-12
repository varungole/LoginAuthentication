let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String , require:true , minLength: 5},
    country: {type: String, require : true},
});

const User = mongoose.model('User' , userSchema);

module.exports = User;
