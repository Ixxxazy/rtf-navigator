const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const {link} = require("./link")
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(link)
        app.listen(PORT, () => console.log(`server is started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()