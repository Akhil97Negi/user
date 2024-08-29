const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const userRouter = require('./src/routes/userRoutes')
const connectToDb = require('./src/configs/db')
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api' , userRouter)

const PORT = process.env.PORT || 5000
const URL = process.env.URL

app.listen(PORT , async () =>{ 
   try {
    await connectToDb(URL)
    console.log(`Server is running in the port ${PORT}`);
   } catch (error) {
    console.log(error.message);
   }
})

