const router=require('express').Router();
const Category=require("../models/category");

router.post("/",async (req,res)=>{
    const newCat  =new Category(req.body);
    try{
        const saveCat = await newCat.save();
        res.sendStatus(200).json(saveCat);
    }catch(err){
        res.sendStatus(500).json(err)
    }
});

router.get("/",async (req,res)=>{
    try{
        const cats  = Category.find();
        res.sendStatus(200).json(cats);
    }catch(err){
        res.sendStatus(500).json(err)
    }
});

module.exports=router;