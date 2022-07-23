require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter")

const app = express()
app.use(express.json())

app.use("/register", userRouter)
app.get("/", (req,res)=>{
    res.json("This is Home Page")
})

const port = process.env.port || 8000
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("MongoDB is connected");
    app.listen(port, ()=>{
        console.log(`${port} port is connected`)
    })
}).catch((e)=>{
    console.log(e);
})
