const mongoose = require("mongoose");
const {config} = require('dotenv');

config();

async function connect(uri) {
    try {
        await mongoose.connect(uri || 'mongodb://localhost/27017');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connect;