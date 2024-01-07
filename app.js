const express = require('express') // invoke express dependency
const app = express() // initialise an express app

//    ---------------------------ROUTE IMPORT -----------------------------
const locationRoutes = require('./routes/locationRoutes')

const connectDB = require('./DB/connect')
require('dotenv').config(); // access the .env


// Parse incoming req bodies in a middleware before your handlers,
// available under the req.body property. into JSON
app.use(express.json()) 

// router use app.use('/api/v1/', locations) // locations router middleware to be written
app.use('/api/v1', locationRoutes)

const PORT = process.env.PORT || 3001
    
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        // ---listen for incoming requests by starting an EXPRESS server only if the DB is connected--------
        app.listen(PORT, console.log(`The app is listening for connections on port ${PORT}`))
}
    catch (error) {
        console.log(error)
    }
}
start()
