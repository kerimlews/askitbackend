
// Modules 
const bcrypt = require('bcryptjs');

// Functions 

module.exports.comparePassword = (hash, password, callback) => {
    bcrypt.compare(password, hash, (err, res) => {
        callback(res); 
    });
}