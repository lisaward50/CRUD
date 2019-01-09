const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const Whisky         = require("./models/whisky");
const resetDatabase  = require("./reset");
const seedDatabase  = require("./seed");
const PORT = process.env.PORT || 3000;
const url = process.env.DATABASEURL || "mongodb://localhost:27017/whisky";

mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//resetDatabase();
//seedDatabase();

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
      //res.send("show page");
    }
  });
});

//EDIT ROUTE
app.get("/whiskies/:id/edit", function(req, res) {
  Whisky.findById(req.params.id, function(err, chosenWhisky){
    //
    if(err){
      res.redirect("/whiskies");
    } else {
      res.render("edit", {whisky: chosenWhisky});
    }
  })
});

//UPDATE ROUTE
app.put("/whiskies/:id", function(req, res) {
  Whisky.findByIdAndUpdate(req.params.id, req.body.whisky, function(err, updatedWhisky){
    if(err){
      res.redirect("/whiskies");
    } else {
      res.redirect("/whiskies/" + req.params.id);
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
