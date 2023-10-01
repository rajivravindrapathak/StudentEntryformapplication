const express = require('express')
const cors = require('cors')
const { connection } = require('./config/db')
const { userController } = require('./routes/Student.routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 2001

app.use(express.json())   
app.use(cors())

app.get("/", (req, res) => {
    res.send("form api")   
})

app.use('/', userController)


app.listen(PORT, async () => {
    try {
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log("not connected to db")    
        console.log(error)
    }
    console.log(`listning on PORT ${PORT}`)
})