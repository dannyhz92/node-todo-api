const expect = require("expect");
const request = require('supertest');
const {ObjectID} = require("mongodb")

const {app} = require("./../server");
const {Todo} = require("../../models/todo");


const fakeID = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text:"First test todo",
  completed: true
}, {
  _id: new ObjectID(),
  text:"Second test todo",
  completedAt: 333
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=> done())
});

describe("POST /todos", ()=>{
  it("should create a new todo", (done)=>{
        var text = "Any value you like"

        request(app)
        .post("/todos")
        .send({text})
        .expect(200)
        .expect((res)=>{
          expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
          if(err){
          return  done(err);
          }

          Todo.find({text}).then((todos)=>{
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e)=>done(e))
        });
  });

    it("shouldnot create todo with invalid bodydata",(done)=>{
      request(app)
      .post("/todos")
      .send({text:""})
      .expect(400)
      .end((err, res)=>{
        if(err){
          return done(err)
        }



        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e))
      })
    });
});


describe("GET /todos", ()=>{
  it("should get all todos", (done)=>{
    request(app)
    .get("/todos")
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2)

    }).end(done);

  });
});


describe("GET /todos/:id",()=>{
    it("should return todo doc", (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });

    it("should return a 404 if todo not found",(done)=>{

        request(app)
        .get(`/todos/${fakeID.toHexString()}`)
        .expect(404)
        .expect((res)=>{
          expect(res.body).toEqual({})
        })
        .end(done);


    });

    it("should return 404 for non-object ids", (done)=>{
      // /todos/123
      request(app)
      .get(`/todos/123`)
      .expect(404)
      .expect((res)=>{
        expect(res.body).toEqual({})
      })
      .end(done)
    });
});


describe("DELETE /todos/:id", ()=>{
  it("should remove a todo",(done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err,res)=>{
      if(err) {
        return done(err);
      }

      Todo.findById(hexId).then((result)=>{
        expect(result).toNotExist();
        done();

      }).catch((e)=>{
        done(e)
      })
    })

  });

  it("should return 404 if todo is not found",(done)=>{
    var hexId = new ObjectID().toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .expect((res)=>{
      expect(res.body).toEqual({})
    })
    .end(done);

  });

  it("Should return 404 if object id is invalid",(done)=>{
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .expect((res)=>{
      expect(res.body).toEqual({})
    })
    .end(done)
  });
});


describe("PATCH /todos:id", ()=>{
  it("should update the todo", (done)=>{
    var id = todos[1]._id.toHexString();
    var text = "new todo modified"
    request(app)
    .patch(`/todos/${id}`)
    .send({text, completed: true})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(true)
    })
    .end(done)
  });

  it("should clear completedAt when todo is not completed", (done)=>{
    const id2 = todos[0]._id.toHexString();
    const update = {text: "Newer text", completed: false};

    request(app)
    .patch(`/todos/${id2}`)
    .send(update)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(update.text)
      expect(res.body.todo.completedAt).toNotExist();
      expect(res.body.todo.completed).toBe(false);
    })
    .end(done)
    // grab id of second todo item
    // update text, set completed to false
    // 200
    // text is changed false, completedAt is null toNotExist
     });
  });
