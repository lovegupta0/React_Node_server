const mongoose=require("mongoose");
const path=require("path");



mongoose.connect("mongodb://localhost:27017/Streaming_service",{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const media=new mongoose.Schema({
  filename:{
    type: String,
    unique: true
  },
  img:String,
  media_url:String,
  premium_contain:String

});


function action(req){
  
    const upload=new mongoose.model("action",media);
     var new_upload=new upload({
      filename:req.body.filename,
      img:req.file.path.split("public")[1],
      media_url:req.body.media,
      premium_contain:req.body.premium_contain
     });
     
     new_upload.save(function(err){
       if(err) throw err;
       else{
         console.log("successfull media added to action");
         
       }
       
     })
}
function comedies(req){

  const upload=new mongoose.model("comedies",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to comedies");
   });
}

function romantic(req){

  const upload=new mongoose.model("romantic",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to romantic");
   });
}


function adventure(req){

  const upload=new mongoose.model("adventure",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to adventure");
   });
}


function musicals(req){

  const upload=new mongoose.model("musicals",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to musicals");
   });
}

function dramas(req){

  const upload=new mongoose.model("dramas",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to dramas");
   });
}


function documentry(req){

  const upload=new mongoose.model("documentry",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to documentry");
   });
}


function scifi(req){

  const upload=new mongoose.model("scifi",media);
   var new_upload=new upload({
    filename:req.body.filename,
    img:req.file.path.split("public")[1],
    media_url:req.body.media,
    premium_contain:req.body.premium_contain
   });
   new_upload.save(function(err){
     if(err) throw err;
     console.log("successfull media added to sci-fi");
   });
}


exports.upload=(req,res)=>{
  const val=[req.body.action,req.body.comedies,req.body.romantic,req.body.adventure,req.body.musicals,req.body.dramas,req.body.documentry,req.body.scifi];
  for(var i=0;i<val.length;i++){
    switch (val[i]) {
      case "action":action(req); break;
      case "comedies":comedies(req); break;
      case "romantic":romantic(req); break;
      case "adventure":adventure(req); break;
      case "musicals":musicals(req); break;
      case "dramas":dramas(req); break;
      case "documentry":documentry(req); break;
      case "scifi":scifi(req); break;
      default: break;
      };
  }

  res.render("admin",{success:'<div class="alert alert-success mb-3" role="alert">File successfully uploaded.......</div>'});
}


