const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Successfully connected to database');  
    }).catch(()=>{
        console.log('Not connected to the database');
    })
}

module.exports = connectDb;