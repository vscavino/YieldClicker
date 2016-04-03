/**
 * Created by s14000079 on 01/04/16.
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    mdp: String,
    pseudo: String,
    antoines: Number,
    iroquois: Number
});

module.exports.User = mongoose.model('user', userSchema);