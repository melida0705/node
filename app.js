var express=require("express");
var app=express();
 var mysql=require('mysql');
 var bodyParser=require('body-parser');

 app.use(bodyParser.json({type:'application/json'}));
 app.use(bodyParser.urlencoded({extended:true}));
 const PORT=8080;
 var con=mysql.createConnection({
     host:'localhost',
     user:'root',
     password:'',
     database:'foodorder_db'
  

 });
 var server=app.listen(8080,function(){
    var host=server.address().address
    var port=server.address().port
    console.log("start");
});
con.connect(function(error){
    if(error) console.log(error);
    else console.log("Connected");
})
app.get('/restaurant',function(req,res){
    con.query('select * from restaurant',function(error,rows,fields){
        if(error) console.log(error);
        else
        {
            console.log(rows);
            res.send(rows);
        }
    })
});