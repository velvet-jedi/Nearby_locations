const mongoose = require('mongoose')

//invoke the connect function in the app.js
const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            
        });
        console.log('Connected to the DB');
    } catch (error) {
       console.error('Mongodb connection error:',error.message) 
    }
}

module.exports = connectDB