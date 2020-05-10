const md5=require("md5");
const sql=require("mysql");
var conn=sql.createConnection({
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

exports.insertion=(body,res)=>{
     var insert="INSERT INTO signup VALUES(?)";
     var data=[body[0].fname,body[0].lname,body[0].email,md5(body[0].password),body[0].mobile,body[0].dob
     ];
    
     
     conn.query(insert, [data], function (err, result ){
        if (err) throw err;
        
        else{
            plan_payment(body,res);
        }
      });

     
}

function plan_payment(body,res){
    var insert="INSERT INTO plan_payment VALUES(?)";
    var data=[body[0].email,body[1].plan,body[2].cardname,body[2].cardnumber,body[2].expdate,body[2].cvv];
    conn.query(insert, [data], function (err){
        if (err){
            del_rec(body);
            console.log(err);
            
        }

        else{
            interest(body,res);
        }
        
      });
}

function interest(body,res){
    var insert="INSERT INTO interest VALUES(?)";
    var data=[body[0].email,body[3].action,body[3].comedies,body[3].romantic,body[3].adventure,body[3].musicals,body[3].dramas,body[3].documentry,body[3].scifi];
    conn.query(insert, [data], function (err){
        if (err){
            del_rec(body);
            console.log(err);
        }

        else{
             res.send("sucess");
            console.log("Number of records inserted successfully......");
        }
        
      });

}

function del_rec(body){
    var del="delete from signup where email=" + '"'+body[0].email+'"';
    conn.query(del,function(err){
        if(err) throw err;
    })

}


exports.login=async (body,res,cookies)=>{
    var login="select *from signup where email=" + '"'+body.username+'"';

   await conn.query(login,function(err,result){
        if(err) throw err;
        else{
            if(result.length>0){
                var pass=md5(body.password);
                if(pass===result[0].password){

                    if(body.rememberMe){
                        var d=new Date();
                        d=new Date(d).valueOf()+7* 24 * 60 * 60 * 1000;
                        var date=new Date(d);
                        cookies.set("streaming_service",body.username,{expires:date, signed: true });
                    }

                    if(body.username==="admin@admin.com"){
                        res.send("admin");
                    }
                    else{
                        res.send("sucess");
                    }
                    
                }

                else{
                    res.send("Not sucess");
                }
            }
        }
        
        
    })
}


exports.Check_email=(body,res)=>{

    var data="select *from signup where email="+"'"+body.email+"'";
    conn.query(data,function(err,result){
        if(err) throw err;
        if(result.length>0){
            res.send("exist");
        }
        else{
            res.send("not matched");
        }
    })

}

