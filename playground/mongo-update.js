const {MongoClient, ObjectID} = require("mongodb");







MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db)=>{
  if(err){
    return console.log("Cannot connect to mongo server")
  }
  console.log("connecting to mongo server");

  // db.collection("ToDos").findOneAndUpdate({
  //   _id: new ObjectID("5b7e0c1993e38e904afefc80"),
  // }, {
  //    $set: {
  //     completed: true
  //   }
  // }, {
  //     returnOriginal: false
  //   }).then((result)=>{
  //   console.log(result)
  // })

  db.collection("ToDos").findOneAndUpdate({
    _id: new ObjectID("5b7e162193e38e904afeff72"),
  }, {
     $inc: {
      intger: 2
    }
  }, {
      returnOriginal: false
    }).then((result)=>{
    console.log(result)
  })


  // db.close();

})
