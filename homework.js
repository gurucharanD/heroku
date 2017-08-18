var express = require('express');
var bodyParser = require('body-parser');
var path=require('path')
var fs = require('fs');
var port=process.env.PORT||8080;
var app = express();
app.use(bodyParser());
var getFile = function (req, res, next) 
{
   res.sendFile(path.join(__dirname+'/homework.html'));
   next()
}
app.get('/',getFile, function(req, res){
    fs.appendFile('log.txt',Date()+"\n",'utf-8',(err,data)=>{
      if(err)
        {
          console.log('error');
        }
  });      
});
app.post('/logger', function(req, res)
{
     var data=req.body.logger;
     fs.appendFile('homework.txt',data+"\n",(err)=>{
      if(err)
        {
        console.log('cannot append into file homework.txt');
        }
       fs.readFile('homework.txt','utf-8',(err,data1)=>{
       if(err)
        {
          console.log('error');
        }
       else
        {
        res.send("concatinated data:"+data+"<br><hr>"+data1);
        }
  });   
  });
  
});

app.listen(8000);