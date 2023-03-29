const mongoose = require('mongoose');
const colors = require('colors');
mongoose.set('strictQuery', false)

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI)
        console.log(`Server Running on ${mongoose.connection.host}`.bgCyan.black)
    }
    catch (err) {
        console.log(`${err}`.bgRed)
    }
};

module.exports = dbConnect

