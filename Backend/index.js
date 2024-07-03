require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoDb=require('./config/mongoDb')
const adminRoute=require('./Router/adminRouter')
const userRoute=require('./Router/userRouter')
const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use('/',userRoute)
app.use('/admin',adminRoute)

app.listen(PORT,()=>{
    console.log(`server run on : http://localhost:${PORT}`);
})

