const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const Whisky         = require("./models/whisky");
const resetDatabase  = require("./reset");
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/whisky", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//resetDatabase();

app.get("/", function(req, res){
  res.render("home");
});

//INDEX ROUTE
app.get("/whiskies", function(req, res){
  Whisky.find({}, function(err, allTheWhiskies){
    if(err){
      console.log(err);
    } else {
      res.render("index", {whiskies: allTheWhiskies});
    }
  });
});

//SHOW ROUTE
app.get("/whiskies/:id", function(req, res){
  Whisky.findById(req.params.id, function(err, chosenWhisky){
    if(err){
      console.log(err);
    } else {
      res.render("show", {whisky: chosenWhisky});
    }
  });
});

//NEW ROUTE
app.get("/whiskies/new", function(req, res){
  res.render("new");
});

//CREATE ROUTE
app.post("/whiskies", function(req, res){
  const name = req.body.name;
  const type = req.body.type;
  const description = req.body.description;
  const image = req.body.image;
  const newWhisky = {name: name, image: image, type: type, description: description};
  Whisky.create(newWhisky, function(err, newlyCreatedWhisky){
    if(err){
      console.log(err);
    } else {
      res.redirect("/whiskies");
    }
  });
});

app.listen(PORT, function(){
  console.log("Server is up and listening");
});
