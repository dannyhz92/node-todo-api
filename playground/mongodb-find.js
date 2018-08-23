const {MongoClient, ObjectID} = require("mongodb");







MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db)=>{
  if(err){
    return console.log("Cannot connect to mongo server")
  }
  console.log("connecting to mongo server");

  // db.collection("ToDos").find({
  //   _id: new ObjectID("5b7cd71593e38e904afef13e")
  // }).toArray().then((docs)=>{
  //   console.log("ToDos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log("Unable to fetch todos", err)
  // });

  // db.collection("ToDos").count().then((count)=>{
  //   console.log("ToDos count:" + count);
  // }, (err)=>{
  //   console.log("Unable to fetch todos", err)
  // });


db.collection("ToDos").find({name:"Daniel"}).toArray().then((docs)=>{
  console.log("Users named Daniel:");
  console.log(docs);
}, (err)=>{
  console.log("Unable to fetch names", err);
})


  // db.close();

})
