const mongoose = require("mongoose");
const Whisky = require("./models/whisky");

function resetDatabase(){
  Whisky.remove({}, function(err){
    if(err){
      console.log(err)
    }
    console.log("Whiskies removed!");
  })
}

module.exports = resetDatabase;
