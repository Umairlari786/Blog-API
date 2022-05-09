const express = require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute=require("./routes/users");
const postsRoute=require("./routes/posts");
const categoryRoute= require("./routes/categories");
const multer =require("multer");
const path= require("path");
dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL,()=>{
   console.log("connected to mongoDb");
})


const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,"hello.jpeg")
    },
});
// uploading file
const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.sendStatus(200).json("file has been uploaded");  
})


app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/posts",postsRoute);
app.use("/api/categories",categoryRoute);

app.listen("8000",()=>{
    console.log("backend is runing");
});
