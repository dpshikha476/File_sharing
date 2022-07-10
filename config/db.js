require('dotenv').config()
const mongoose = require('mongoose')

connectDB = () => {
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    const db = mongoose.connection
    db.on('open', () => {
        console.log('db connected')
    })
    db.on('error', () => {
        console.log('something went wrong while connecting to DB');
    })
}

module.exports = connectDB