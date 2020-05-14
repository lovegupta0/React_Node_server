const mongoose=require("mongoose");
const sql=require("mysql");
var allData=[];
var caroData=[];
const conn=sql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12339010",
  password: "1eKFIYBhDy",
  database: "sql12339010",
  insecureAuth : true
});

conn.connect(function(err){
    if(err) throw err;
});

mongoose.connect(process.env.MONGODB_URI ||"mongodb+srv://lovegupta0:lovegupta@sservice-f1okn.mongodb.net/Streaming_service",{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

const media=new mongoose.Schema({
    filename:String,
    img:String,
    media_url:String,
    premium_contain:String
  
});

function uploadData(body,img,val){
  
  const upload=new mongoose.model(val,media);
   var new_upload=new upload({
    filename:body.filename,
    img:img,
    media_url:body.media,
    premium_contain:body.premium_contain
   });
   
   new_upload.save(function(err){
     if(err) throw err;
     else{
       console.log("successfull media added to "+val);
       
     }
     
   })
}


function getData(val){
    return new Promise((resolve,reject)=>{
  
      const found=new mongoose.model(val,media);
      var arr=[];
     found.find(function(err,result){
        if(err) throw err;
        else{
          
        resolve(result);
        }
      });
      
    });
}


exports.view=async (body,res)=>{
    if(!body.username){
      body={username:body};
    }
    var val=["signup","plan_payment","interest"];
    var profile_data=[];
    for(var i=0;i<3;i++){
   await profile(body,val[i]).then((values)=>{
      profile_data[i]=values;
    });
    
    }
    val=[profile_data[2][0].Action,profile_data[2][0].Comedies,profile_data[2][0].Romantic,profile_data[2][0].Adventure,profile_data[2][0].Musicals,
    profile_data[2][0].Dramas,profile_data[2][0].Documentry,profile_data[2][0].Sci_fi];
  
    var data=[];
    for(i=0;i<val.length;i++){
      if(val[i]){
        await getData(val[i]).then((values)=>{
          if(values.length>0) { data.push(values);} 
        })
      }
    }

    Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );
    
    var filteredData = Object.filter(profile_data[2][0], score => score !==null);

    var obj={
      username:body,
      name:profile_data[0][0].fname,
      status:"sucess"
    }
    
    var profileData=[filteredData];
    profileData.push(data);
    profileData.push(obj);
    var userData=JSON.stringify(profileData);    
    res.send(userData);
}

function profile(body,val){
    return new Promise((resolve,reject)=>{
     
     var get="select *from "+ val+" where email=" + '"'+body.username+'"';
     
    conn.query(get,function(err,result){
       if(err) throw err;
       else{
          resolve(result);
          }
         });
    });
  
}

async function extract(){

  var val="alldata";     
  await getData(val).then((values)=>{
    if(values.length>0) {
              
       allData=values;
    }
               
  })
        
}


extract();

function alldatas(body,img){
  
  const upload=new mongoose.model("alldata",media);
   var new_upload=new upload({
    filename:body.filename,
    img:img,
    media_url:body.media,
    premium_contain:body.premium_contain
   });
   
   new_upload.save(function(err){
     if(err) throw err;
     else{
       extract();
       console.log("successfull media added to alldata");
       
     }
     
   })
}

exports.getAllData=async (res)=>{
    
      res.send(JSON.stringify(allData));
}


exports.upload=(body,img,res)=>{
  const val=[body.action,body.comedies,body.romantic,body.adventure,body.musicals,body.dramas,body.documentry,body.scifi];
  
  alldatas(body,img);
  for(var i=0;i<val.length;i++){
    if(val[i]){
      uploadData(body,img,val[i]);
    }
  }
  res.send(200);
}

 exports.caroVal=async (res)=>{
  await getData("caro").then((values)=>{
    if(values.length>0) {
      caroData=values;
    } 
  });
  res.send(JSON.stringify(caroData));
}

const removeCaro=()=>{
  if(caroData){
    const remove=new mongoose.model("caro",media);
    remove.deleteOne({ _id:caroData[0]._id},(err)=>{if(err) throw err;});
    remove.deleteOne({ _id:caroData[1]._id},(err)=>{if(err) throw err;});
    remove.deleteOne({ _id:caroData[2]._id},(err)=>{if(err) throw err;});

  }
}

const setCaro= async (body)=>{
  const upload=new mongoose.model("caro",media);
  var new_upload=new upload({
    filename:body.filename,
    img:body.img,
    media_url:body.media_url,
    premium_contain:body.premium_contain
   });
   
   new_upload.save(function(err){
     if(err) throw err;
     else{
       console.log("successfull media added to caro");
       
     }
     
   })
  
}

exports.updateCaro=(body,res)=>{
  removeCaro();
  for(var i=0;i<3;i++){
    setCaro(body[i]);
  }
  res.send("sucess");
}



