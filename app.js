const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const Whisky         = require("./models/whisky");
const resetDatabase  = require("./reset");
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/whisky", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

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

//NEW ROUTE
app.get("/whiskies/new", function(req, res){
  res.render("new");
});

//CREATE ROUTE
app.post("/whiskies", function(req, res){
  Whisky.create(req.body.whisky, function(err, newWhisky){
    if(err){
      res.render("new");
    } else {
      res.redirect("/whiskies");
    }
  });
});

//SHOW ROUTE
app.get("/whiskies/:id", function(req, res){
  Whisky.findById(req.params.id, function(err, chosenWhisky){
    if(err){
      res.redirect("/whiskies");
    } else {
      res.render("show", {whisky: chosenWhisky});
    }
  });
});

//DESTROY ROUTE
app.delete("/whiskies/:id", function(req, res){
  Whisky.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/whiskies");
    } else {
      res.redirect("/whiskies");
    }
  });
});

app.listen(PORT, function(){
  console.log("Server is up and listening");
});
