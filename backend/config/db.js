const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`connect db ${mongoose.connection.host}`)
    } catch (e) {
        console.log(e.message, "error db")
    }
}

module.exports = connectDB