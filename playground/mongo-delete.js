const {MongoClient, ObjectID} = require("mongodb");







MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db)=>{
  if(err){
    return console.log("Cannot connect to mongo server")
  }
  console.log("connecting to mongo server");

  // db.collection("ToDos").deleteMany({text:"duplicate"}).then((result)=>{
  //   console.log(result)
  // });

  // db.collection("ToDos").deleteOne({text:"unique text of what to do"}).then((result)=>{
  //   console.log(result)
  // })

  // db.collection("ToDos").findOneAndDelete({completed: false}).then((result)=>{
  //   console.log(result)
  // })

  // db.collection("ToDos").deleteMany({name:"Daniel"}).then((result)=>{
  //   console.log(result)
  // });

  db.collection("ToDos").findOneAndDelete({_id: new ObjectID("5b7cd72a93e38e904afef146")}).then((result)=>{
    console.log(result);
  })

  // db.close();

})
