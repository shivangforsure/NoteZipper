const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MOnGO_URI, {
            useUnifiedTopology: true, useNewUrlParser: true
        })
        console.log('DB connected ' + conn.connection.host)
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = connectDB