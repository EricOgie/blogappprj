//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const EjsObjGen = require(__dirname + "/ejsobjgen.js");

const ejsGen = new EjsObjGen();
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const port = process.env.PORT|| 3000 ;

const posts = [];

app.get("/", (req, res)=>{
  res.render("home", {startCont: ejsGen.getStartCont("/"), posts:posts});

})

app.get("/about", (req, res)=>{
res.render("about", {startCont: ejsGen.getStartCont("/about")});
})

app.get("/contact", (req, res)=>{
  res.render("contact", {startCont: ejsGen.getStartCont("/contact")});

})

app.get("/compose", (req, res)=>{
  res.render("compose");
})

app.post("/compose", (req, res)=>{

const post = {
    title: req.body.composeTitle,
    post: req.body.composeMsg
  }
posts.push(post);
res.redirect("/")

})

app.get("/posts/:title", (req, res)=>{

  posts.forEach((e)=>{
    if(lodash.lowerCase(e.title) === lodash.lowerCase(req.params.title)){
      res.render("post", {postTitle: e.title, postMsg: e.post })
    }else{
      res.send("Post not Found");
    }
  })

})

app.listen(port, ()=>{
  console.log("Server listen on Port " + port );
})
