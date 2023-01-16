const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const { postModel } = require('../models/posts.model');



const postRouter = express.Router();

postRouter.use(authentication)

postRouter.get("/",async (req,res)=>{
  //data only of logged in users
  const {userID} = req.body;
  const {device1,device2} = req.query;
  try {
    let data;
  if(device1){
  data = await postModel.find({userID},{device:device1});
  }else if (device1 && device2){
    data = await postModel.find({userID},{device:device1},{device:device2})
  } else{
    data = await postModel.find({userID});
    
  }
  res.send(data);
  } catch (err) {
    console.log(err);
    res.send({"err":err.message}) 
  }
})

postRouter.post("/add", async(req,res)=>{
  console.log(req.body.userID)
  try {
    let data = new postModel(req.body);
     await data.save();
     res.send("post added succesfully");
  } catch (err) {
    console.log(err);
    res.send({"err":err.message}) 
  }
})


postRouter.patch("/update/:id", async(req,res)=>{
   
    const{title} = req.body;
    console.log(title);
    const id = req.params.id

  try {
      await postModel.findByIdAndUpdate(id,{title:title});
     res.send("post updated succesfully");
  } catch (err) {
    console.log(err);
    res.send({"err":err.message}) 
  }
})


postRouter.delete("/delete/:id", async(req,res)=>{
   
    const id = req.params.id

  try {
      await postModel.findByIdAndDelete(id);
     res.send("post deleted succesfully");
  } catch (err) {
    console.log(err);
    res.send({"err":err.message}) 
  }
})


module.exports = {postRouter};