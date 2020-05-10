const mongoose=require("moongoose");
const mysql=require("mysql");

mongoose.connect("mongodb+srv://lovegupta0:lovegupta@sservice-f1okn.mongodb.net/Streaming_service",{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

var conn=mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12339010",
    password: "1eKFIYBhDy",
    database: "sql12339010",
    insecureAuth : true
});

conn.connect(function(err){
    if(err) throw err;
    else{
        console.log("connection successfully started...");
        
    }
});

