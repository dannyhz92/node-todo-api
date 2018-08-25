const {ObjectID} = require("mongodb")

const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../models/todo");
const {User} = require("../models/user")


// var id = "5b80a21173a199241059c879";

// if(!ObjectID.isValid(id)){
//   console.log("ID not valid)")
// }

// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log("Todos", todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log("Todo", todo);
// });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log("ID not found")
//   }
//   console.log("Todo by id", todo);
// }).catch((e)=> console.log(e));

var id2 = "5b80af8593e38e904aff233d";

User.findById("5b7f4f830b849d6831b6b246").then((user)=>{
  if(!user) return console.log("Id not found");

  console.log("User:", user);
}).catch((e)=>console.log(e))
