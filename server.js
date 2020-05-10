const express=require("express");
const bodyParser=require("body-parser");
const signup_login=require("./signup&login");
const Cookies=require("cookies");
const home=require("./home");
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const keys=["hello world"];

app.route("/login")
    .get(function(req,res){
        
        res.send("success");
    })
    .post((req,res)=>{
    const cookies = new Cookies(req,res, { keys: keys });
    signup_login.login(req.body,res,cookies);
});

app.post("/signup",(req,res)=>{
    signup_login.insertion(req.body,res);
    
})

app.post("/api/check_email",(req,res)=>{
    signup_login.Check_email(req.body,res);
    
})

app.post("/api/logout",(req,res)=>{
    const cookies = new Cookies(req,res, { keys: keys });
    if(req.body.logout){
        cookies.set("streaming_service",["null"],{overwrite:true,signed: true});
        res.send("sucessful");
    }
    else{
        res.send("Not sucessful");
    }
});

app.listen(3500,function(){
    console.log("server started on part 3500.........");
});