const jwt = require('jsonwebtoken');
const { postModel } = require('../models/posts.model');
const key  = process.env.key;


const authentication = async(req,res,next)=>{


  const authorization = req.headers.authorization;
  

  try {
   
    jwt.verify(authorization,key,(err,decoded)=>{
      if(decoded){
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
    }else{
      res.send("You are not the authorized person");
    }
    });
   } catch (err) {
    console.log(err);
    res.send("enter valid token");
   }

}

module.exports = {authentication}