var express = require('express')
var app = express()
var body = require("body-parser")
var mongoose = require("mongoose")
var friends = ["a","b","c","d","e"];
var MongoClient = require('mongodb').MongoClient;
app.use(body.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://mefkar1:14531453@mefkar-j2yoy.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true }).then(()=>console.log("DB connected")).catch(err => console.log(err));
var MongoClient = require('mongodb').MongoClient;
var studentschema = new mongoose.Schema({
  Name:String,
  Rollno:String,
  Teamname:String
})

app.use(express.static("public"));

app.use(express.static(__dirname+"/public"));

var Student = mongoose.model("Student",studentschema);

app.post("/update",function(req,res){
  MongoClient.connect("mongodb+srv://mefkar1:14531453@mefkar-j2yoy.mongodb.net/test?retryWrites=true&w=majority", function(err, db) {
  //if (err) throw err;
  var dbo = db.db("test");
  var hi_2 = req.body.old
  var hi_new = req.body.up
  var hiii = req.body.value__2
  switch (hiii) {
    case "Name":
    var myquery = { Name: hi_2 };
    var newvalues = { $set: {Name: hi_new} };
    dbo.collection("students").updateOne(myquery, newvalues, function(err, obj) {
      if(err){
        console.log("Cannot update record");
      }
      else{
        res.render("Home.ejs",{student:obj});
      }
    });
      break;
    case "Teamname":
    var myquery = { Teamname: hi_2 };
    var newvalues = { $set: {Teamname: hi_new} };
    dbo.collection("students").updateOne(myquery, newvalues, function(err, obj) {
      if(err){
        console.log("Cannot update record");
      }
      else{
        res.render("Home.ejs",{student:obj});
      }
    });
      break;
    case "Rollno":
    var myquery = { Rollno: req.body.old };
    var newvalues = { $set: {Rollno: req.body.new} };
    dbo.collection("students").updateOne(myquery, newvalues, function(err, obj) {
      if(err){
        console.log("Cannot update record");
      }
      else{
        res.render("Home.ejs",{student:obj});
      }
    });
      break;
    default:
  }

});
})

app.post("/push",function(req,res){
  var route = req.query.name;
  res.render("Home.ejs",{name:friends,student:null});
  var Jithu = new Student({
    Name:req.body.myname,
    Rollno:req.body.myroll,
    Teamname:req.body.myteam
  }).save().then(()=>console.log("Saved")).catch(()=>console.log("Save Failed"));
})

app.post("/delete",function(req,res){
  MongoClient.connect("mongodb+srv://mefkar1:14531453@mefkar-j2yoy.mongodb.net/test?retryWrites=true&w=majority", function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var hi =  req.body.deliii
  var  hi_1 = req.body.value_1
  switch (hi_1) {
    case "Name":
    var myquery = { Name : hi };
    dbo.collection("students").deleteOne(myquery, function(err, obj) {
      if(err){
        console.log("Cannot delete record");
      }
      else{
        res.render("Home.ejs",{student:obj});
      }
    });
      break;
    case "Teamname":
    var myquery = { Teamname : hi };
    dbo.collection("students").deleteOne(myquery, function(err, obj) {
      if(err){
        console.log("Cannot delete record");
      }
      else{
        res.render("Home.ejs",{student:obj});
      }
    });
      break;
    case "Rollno":
    var myquery = { Rollno : hi };
    dbo.collection("students").deleteOne(myquery, function(err, obj) {
      if(err){
        console.log("Cannot delete record");
      }
      else{
        res.render("Home.ejs",{student:obj});
      }
    });
      break;
    default:

  }
});
})

app.post("/find",function(req,res){
  console.log(req.body.search)
  //console.log(req.body.Field)
 hi = req.body.value
  console.log(hi)
  switch (hi) {
    case "Teamname":
    Student.find({Teamname:req.body.search},function(err,user){
      if(err){
        console.log("Cannot find Query element in any record");
      }
      else{
        res.render("Home.ejs",{student:user});
      }
    })
      break;
    case "Name":
    Student.find({Name:req.body.search},function(err,user){
      if(err){
        console.log("Cannot find Query element in any record");
      }
      else{
        res.render("Home.ejs",{name:friends,student:user});
      }
    })
      break;
    case "Rollno":
    Student.find({Rollno:req.body.search},function(err,user){
      if(err){
        console.log("Cannot find Query element in any record");
      }
      else{
        res.render("Home.ejs",{name:friends,student:user});
      }
    })
      break;
    default:
      console.log(us)
  }
})


app.get('/',function(req,res){
  //res.Sendfile(__dirname+"/public");
  // var route = req.qurey.name;
  res.render("Home.ejs",{student:null});
})
app.get("/home/:new",function(res,req){
  var old = req.query.new;
  res.send("Welcometo "+ old + " page");
})
app.get("/add",function(req,res){
  var neww = req.body.myinp;
  console.log(neww);
  friends.push(neww);
  res.render("Home.ejs",{name:friends,student:null});
})

app.get("*",function(req,res){
  res.send("Enter a valid address");
})

app.listen(3000,function(){
   console.log("server hosted at localhost:3000");
})
