const express = require('express')
const dotenv = require('dotenv')
// const cors = require('cors')
const notes = require('./notes')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const connectDB = require('./config/db')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')

const app = express()
dotenv.config()
connectDB()
// app.use(cors())
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)


app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))