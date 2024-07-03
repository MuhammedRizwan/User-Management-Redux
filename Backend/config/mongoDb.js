const mongoose = require('mongoose')

const mongoDb = mongoose.connect(process.env.MONGODB)
    .catch(error => {
        console.log('Error in mongodb', error);
    })
module.exports = mongoDb