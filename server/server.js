var express = require("express");
var bodyParser = require("body-parser");
const {ObjectID} = require("mongodb")


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

app.get("/todos",(req, res)=> {
  Todo.find().then((todos)=>{
    res.send({todos})
  }, (e)=>{
     res.status(400).send(e);
  })
});

// get todos/12345
app.get("/todos/:id", (req, res)=>{
    var item;
    var id = req.params.id ;
    if(ObjectID.isValid(id)){
       Todo.findOne({
        _id: id
      }).then((todo)=>{
        res.status(200).send(todo.text)

      });
    } else {
      res.status(404).send( );
      console.log("Couldn't fetch todo")
    }
    // validated id using isValid
    // give 404 if todo wasn't found
    // just call send with no body

    // findById the todo
    // if todo, send it back
    // if not
    // 400 - and send empty body back
})

app.listen(3000, ()=> {
  console.log("Started on port 3000")
});


module.exports = {app}
