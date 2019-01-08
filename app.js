const express = require("express");
const app = express();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.get("/", function(req, res){
  res.render("home");
});

app.get("/whiskies", function(req, res){
  res.render("index");
});

app.get("/whiskies/new", function(req, res){
  res.render("new");
});

app.post("/whiskies", function(req, res){

});

app.listen(PORT, function(){
  console.log("Server is up and listening");
});
