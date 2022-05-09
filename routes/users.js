const router =require("express").Router();
const User=require("../models/user");
const Post=require("../models/Post");
const bcrypt=require("bcrypt");
const user = require("../models/user");

// Update
router.put("/:id",async(req,res)=>{
if(req.body.userId === req.params.id){
    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
            $set: req.body,
        },
        {new :true }
        );
        res.sendStatus(200).json(updatedUser);
    }
    catch(err){
        res.sendStatus(500).json(err);
    } 
}else{
    res.sendStatus(401).json("you can update only your account");
}
});

// Delete
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
           const user=await User.findById(req.params.id);
        try{
            await Post.deleteMany({
                username:user.username
            });
            await User.findByIdAndDelete(req.params.id);
            res.sendStatus(200).json("USER HAS BEEN DELETED..");
        }
        catch(err){
            res.sendStatus(500).json(err);
        } 
    }catch(err){
        res.sendStatus(401).json("user not found");
    }
    }else{
        res.sendStatus(401).json("you can update only your account");
    }
    });

// Get
router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...others} =user._doc;
        res.sendStatus(200).json(others);
    }catch(err){
      res.sendStatus(500).json(err);
    }
});

module.exports=router