const router =require("express").Router();
const User=require("../models/user");
const Post=require("../models/Post");


// Create post
router.post("/",async(req,res)=>{
  const newPost=new Post(req.body);
  try{ 
      const savedPost= await newPost.save();
    res.sendStatus(200).json(savedPost);
  }catch(err){
      res.sendStatus(500).json(err);
  }
});

// Update post
router.put("/:id",async(req,res)=>{
   try{
       const post= await Post.findById(req.params.id);
       if(post.username === req.body.username){
           try{
               const updatedPost= await Post.findByIdAndUpdate(
                   req.params.id,
                   {
                       $set:req.body,
                   },
                   {new: true});
              res.sendStatus(200).json(updatedPost);
           } catch(err){
            res.sendStatus(500).json(err);
           }
       }else{
           res.sendStatus(401).json("you can update only your post");
          }
      } catch(err){
          res.sendStatus(500).json(err);
       }
 });
// Delete post
router.delete("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
               res.sendStatus(200).json("Post has been deleted.");
            } catch(err){
             res.sendStatus(500).json(err);
            }
        }else{
            res.sendStatus(401).json("you can delete only your post");
           }
       } catch(err){
           res.sendStatus(500).json(err);
        }
  });
// Get post
router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.sendStatus(200).json(post);
    }catch(err){
      res.sendStatus(500).json(err);
    }
});

// Get ALL POST
router.get("/",async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username});
        }else if(catName){
            posts =await Post.find({categories:{
                $in:[catName]
            }})
        } else{
            posts=await Post.find();
        }
        res.sendStatus(200).json(posts);
        
    }catch(err){
      res.sendStatus(500).json(err);
    }
});

module.exports=router