const router =require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");

// Regiater
router.post("/register",async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpass,
        });

        const user=await newUser.save();
        res.sendStatus(200).json(user);

    }
    catch(err){
        res.sendStatus(500).json(err);
    }
});

// login
router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        !user && res.sendStatus(400).json("you are not a user");

        const validated=await bcrypt.compare(req.body.password,user.password)
        !validated && res.sendStatus(400).json("Wrong password buddy");
        
        const{password,...others} = user._doc;
        res.sendStatus(200).json(others);
    }
    catch (err){
        res.sendStatus(500).json(err);
    }
})



module.exports=router