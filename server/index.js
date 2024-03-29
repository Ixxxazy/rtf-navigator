const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const config = require("./config");
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.MONGODB_CONNSTRING)
        app.listen(PORT, () => console.log(`server is started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()