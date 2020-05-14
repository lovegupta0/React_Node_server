const express=require("express");
const bodyParser=require("body-parser");
const mongoo=require("mongoose");
const sql=require("mysql");
const md5=require("md5");
const signup_login=require("./signup&login");
const Cookies=require("cookies");
const mongoose=require(__dirname+"/mongoose.js");
const app=express();
const multer=require("multer");
const path=require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.use(express.static(__dirname+"/public/upload"));

var storage=multer.diskStorage({
    destination:"./public/upload/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  })
  
  var upload=multer({
    storage:storage
  });

const keys=["hello world"];
var username="";
var img="";

app.get("/",(req,res)=>{
    res.send("working...");
})

app.route("/login")
    .get(function(req,res){
        
        res.send("success");
    })
    .post((req,res)=>{
        username=req.body.username;
    const cookies = new Cookies(req,res, { keys: keys });
    signup_login.login(req.body,res,cookies);
});

app.post("/signup",(req,res)=>{
    signup_login.insertion(req.body,res);
    
})

app.post("/api/check_email",(req,res)=>{
    signup_login.Check_email(req.body,res);
    
})

app.get("/api/getData",(req,res)=>{
    const cookies = new Cookies(req,res, { keys: keys });
    if(username){
        mongoose.view(username,res);
        username="";
    }
    else{
        var x=cookies.get("streaming_service");
        if(x!=="null" && x){
        mongoose.view(x,res);
        }
        else{
            res.send("null");
        }
    }
})

app.post("/api/upload",upload.single("img"),(req,res)=>{
    if(req.file){
        img=req.file.path.split("public")[1];
        console.log(img);
        
    res.status(200).send();
    }
    else{
        if(img){
            mongoose.upload(req.body,img,res);
        }
        else{
            res.send(500);
        }
        img="";
    }
    

})

app.get("/api/getCaro",(req,res)=>{
    mongoose.caroVal(res);
})

app.post("/api/setCaro",(req,res)=>{
    mongoose.updateCaro(req.body,res);
})

app.post("/api/logout",(req,res)=>{
    const cookies = new Cookies(req,res, { keys: keys });
    if(req.body.logout){
        cookies.set("streaming_service",["null"],{overwrite:true,signed: true});
        username="";
        res.send("sucessful");
    }
    else{
        res.send("Not sucessful");
    }
});

app.get("/api/getAllData",(req,res)=>{
    mongoose.getAllData(res);
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3500;
}

app.listen(port,function(){
    console.log("server started on port "+port+".........");
});