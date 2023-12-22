const mongoose = require('mongoose');
require('dotenv').config();
exports.connectMongoose = () => {
    mongoose.connect(process.env.MONGODB)
    .then((e) => console.log(`Connected to Mongodb: ${e.connection.host}`))
    .catch((e) => console.log(e));
};