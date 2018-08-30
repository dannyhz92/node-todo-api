const {ObjectID} = require("mongodb")

const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../models/todo");
const {User} = require("../models/user");

// Todo.remove({}).then((result)=>{
//   console.log(result)
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove("5b8742ec93e38e904a00525d").then((todo)=>{
  console.log(todo)
});
