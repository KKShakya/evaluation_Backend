const express = require('express');
const { connection } = require('./config/database');
const { postRouter } = require('./routes/posts.route');
const { userRouter } = require('./routes/user.routes');
const cors = require('cors')
const port = process.env.port || 4300;

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{

  res.send("Welcome to Social media app");
})
app.use(cors({
  "origin":"*"
}))
app.use("/users",userRouter);
app.use("/posts",postRouter);


app.listen(port,async()=>{
  try {
    let data =  await connection;
    console.log(`connection established to socialMedia databse on port ${port}`)
  } catch (err) {
    console.log(err);
  }
})