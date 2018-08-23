const {MongoClient, ObjectID} = require("mongodb");





// MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db)=>{
//   if(err){
//     return console.log("Unable to connect to MongoDb server");
//   }
//   console.log("Connected to Mongo Server");
//
//   db.collection("ToDos").insertOne({
//     text: "Somthing to do",
//     completed: "False"
//   },(err, result)=>{
//     if(err){
//       return console.log("Unable to insert todo", err);
//     }
//     console.log(JSON.stringify(result.ops))
//   });
//
//   db.close();
// });


MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db)=>{
  if(err){
    return console.log("Cannot connect to mongo server")
  }
  console.log("connecting to mongo server");

  db.collection("ToDos").insertOne({
     name: "Daniel",
     age: 26,
  }, (err, result)=>{
    if(err){
      return console.log("Unable to save file");
    }
    console.log(JSON.stringify(result.ops))
  })

  db.close();

})
