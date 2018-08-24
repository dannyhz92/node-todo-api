var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("../models/todo");
var {User} = require("../models/user");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res, next)=>{
    var todo = new Todo({
      text: req.body.text
    });
    todo.save().then((doc)=>{
      res.send(doc);
    }, (e)=>{
      res.status(400).send(e);
    });
});

app.listen(3000, ()=> {
  console.log("Started on port 3000")
});


module.exports = {app}


// var newUser = new User({
//   email:"saywhat@gmail.com"
// });
//
// newUser.save().then((doc)=>{
//   console.log(doc);
// }, (e)=>{
//   console.log("Unable to save user")
// })
//
// // save new something
