
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv=require('dotenv')
var mysql = require('mysql');

dotenv.config();
app.use(express.json());
var con = mysql.createConnection({
    host:'sql11.freemysqlhosting.net',
     user:'sql11400291',
     password:'mrdDyc2N3F',
     database:'sql11400291'
  });
  app.listen(PORT, function() {
    console.log(`Listening on Port ${PORT}`);
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
const courses = [
  { id: 1, name: "Algorithms" },
  { id: 2, name: "Software Engineering" },
  { id: 3, name: "Human Computer Interaction" }
];

const smtpTransport=nodemailer.createTransport({
 service:'iCloud',
  auth:{
    user:process.env.HOTMAIL_USER,
    pass:process.env.HOTMAIL_PASSWORD
  },
  
});

app.get('/send/:to/:username/:password',function (req,res)
{ 
  
//   var smtpTransport=nodemailer.createTransport({
//   service:'hotmail',
//   port:587,
//   host:'smpt.live.com',
//   auth:{
//     user:process.env.HOTMAIL_USER,
//     pass:process.env.HOTMAIL_PASS
//   }
  
// });

//console.log("OVO JE MAIL"+process.env.HOTMAIL_USER+process.env.HOTMAIL_PASS)
//res.send("Bla")
    rand=Math.floor((Math.random() * 100) + 54);
  //    var host=req.get('host');
  // //   console.log(host);
  // //   console.log(rand)
  email=req.params.to;
      url="https://foodorder0705.herokuapp.com/verify/"+req.params.username+"/"+rand;
  //    link="http://"+req.get('host')+"/verify?id="+rand;
//       smtpTransport=nodemailer.createTransport({
//       service:'hotmail',
      
//       auth:{
//         user: process.env.HOTMAIL_USER,
//         pass: process.env.HOTMAIL_PASSWORD
//       },
//     });
    
   // link="http:";
//   try{
//    smtpTransport.sendMail({
//     from: process.env.HOTMAIL_USER,
//         to : req.params.to,
//         subject :'Please confirm your Email account',
//         html:"Hello,<br> Please Click on the link to verify your email.<br><a href="+url+">Click here to verify</a>"

//     })
     
// //  console.log("NECU")
//  }
//    catch(error){
//    }
    var emaildup=false;
    var message;
    con.query("select users.useremail from users",function(error,rows)
    { 
      if(error){

      }
      else{
      for (var i = 0; i < rows.length; i++) {
        if(rows[i].useremail==email){
          emaildup=true;
          console.log("isti");
        //  console.log("OVO JE AMIL"+emaildup);
          
           
       }
      
    }
    console.log("U else smo"+emaildup);
    if(emaildup!=true){
      con.query("insert into users (username,password,user_type,useremail,verified,token) values('"+req.params.username+"','"+ req.params.password + "','kupac','"+req.params.to+"',0,'"+rand+"')",function(error,result){
        if(error) {
         message="Userexist";
         
         console.log("IMA ERROR"+message);res.json({message: message});
        }
        else
        {
         // res.send("true")
        message="true";
        try{
          smtpTransport.sendMail({
           from: process.env.HOTMAIL_USER,
               to : req.params.to,
               subject :'Please confirm your Email account',
               html:"Please Click on the link to verify your email <a href="+url+">Click here to verify</a>"
       
           })
            
       //  console.log("NECU")
        }
          catch(error){
          }
        res.json({message: message});
          // con.query("select users.useremail from users",function(error,rows)
          // { 
          //   for (var i = 0; i < rows.length; i++) {
          //     if(rows[i].useremail==req.params.to){
          //       emaildup=true;
          //       break;
                 
          //    }
          //    else{
          //      emaildup=false;
           
          //   }
          //  }
          //     if(emaildup==true)
          //     {
          //       res.send("exist");
          //     }
          //     else{
                
          //       res.send("true");
          //     }
          }
          
          
         
           
        
      }
  
    )
  }
  else if(emaildup==true){
    message="emailexist";
    res.json({message: message});
  }  console.log("OVO JE PORUKA"+message);
     }
    
        // if(emaildup==true)
        // {
        //   res.send("exist");
        // }
        // else{
          
        //   res.send("true");
        // }
    })

  
  
    

  // smtpTransport.sendMail(
  //     {
  //       from:"melidaradoncic@hotmail.com",
  //       to : req.params.to,
  //       subject : "Please confirm your Email account",
  //       html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    
  //     }).catch(err);
     
});
app.get('/verify/:username/:token',function(req,res){
  const decodedtoken=req.params.token;
  console.log(decodedtoken);
  con.query('select users.token from users where username="'+req.params.username+'"',function(error,rows,fields){
    if(error) console.log(error);
    else
    {
      con.query("update users set verified='1' where username='"+req.params.username+"'",function(error,result){
   
        console.log(rows);
        res.send("<h1>Email is  Successfully verified</h1>");})

    }
})
//res.send(decodedtoken);
  
  console.log(req.protocol+":/"+req.get('host'));
  // if((req.protocol+"://"+req.get('host'))==("http://"+host))
  // {
  //     console.log("Domain is matched. Information is from Authentic email");
  //     if(req.body.id==rand)
  //     {
  //         console.log("email is verified");
  //         res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
  //     }
  //     else
  //     {
  //         console.log("email is not verified");
  //         res.end("<h1>Bad Request</h1>");
  //     }
  // }
  // else
  // {
  //     res.end("<h1>Request is from unknown source");
  // }
  });
  
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
app.get('/getrestaurantid/:username',function(req,res){

  con.query('select * from seller where username="'+req.params.username+'"',function(error,rows,fields){
    if(error) console.log(error);
    else
    {
        console.log(rows);
        res.send(rows);
    }
})
})
app.get('/reviews/:restaurantid',function(req,res){
  con.query('select * from reviews where restaurant_id="'+req.params.restaurantid+'"',function(error,rows,fields){
      if(error) console.log(error);
      else
      {
          console.log(rows);
          res.send(rows);
      }
  })
});

app.post('/addreview/:customerid/:restaurantid/:mark/:review',function(req,res,next){

  con.query("insert into reviews (customer_username,review,restaurant_id,mark) values('"+req.params.customerid+"','"+ req.params.review + "','"+ req.params.restaurantid + "','"+req.params.mark+"')",function(error,result){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(result);
          res.send(result);
          next();
      }
  })
})

app.post('/leavereview/:customerid/:restaurantid:/:mark/:review',function(req,res,next){

  con.query("insert into reviews (customer_username,review,restaurant_id,mark) values ('"+req.params.customerid+"','"+ req.params.review +"','"+req.params.restaurantid+"','"+req.params.mark+"')",function(error,rows,fields){
      if(error) console.log(error);
      else
      {
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});

app.get('/login/:username/:password',function(req,res){
  var status=0;
  var pass=req.params.password;
 // console.log(pass);
    con.query("select users.username,users.password,users.user_type,users.useremail,users.verified from users where users.username='"+req.params.username+"' and users.password='"+pass+"'",function(error,rows,fields){
        if(error) console.log(error);
        else
        {
            console.log(rows);
            
            res.send(rows);
        }
    })
});
app.get('/loginEmail/:email/:password',function(req,res){
  var status=0;
  var pass=req.params.password;
 // console.log(pass);
    con.query("select users.username,users.password,users.user_type,users.useremail,users.verified from users where users.useremail='"+req.params.email+"' and users.password='"+pass+"'",function(error,rows,fields){
        if(error) console.log(error);
        else
        {
            console.log(rows);
            
            res.send(rows);
        }
    })
});
app.get('/menu/:id',function(req,res,next){
  var  ids=req.params.id;
     console.log(ids);
  con.query("select * from food where restaurant_id='" + req.params.id + "'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.get('/category',function(req,res,next)
{
  con.query("select * from category",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})
app.get('/foodcategory/:id',function(req,res,next)
{
  con.query("select * from food where food_category_id='" + req.params.id + "'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})
app.get('/food/:id',function(req,res,next){
  var  ids=req.params.id1;
  console.log("JA sam food id"+ids);
con.query("select * from food where food_id='" + req.params.id + "'",function(error,rows,fields){
   if(error) console.log(error);
   else
   {   console.log("Radim");
       console.log(rows);
       res.send(rows);
       next();
   }
})
});



app.post('/addcart/:customerid/:restaurantid/:id/:price',function(req,res,next){

  con.query("insert into cart (username,restaurant_id,food_id,quantity,price) values('"+req.params.customerid+"','"+ req.params.restaurantid + "','"+ req.params.id + "',1,'"+req.params.price+"')",function(error,result){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(result);
          res.send(result);
          next();
      }
  })
})
app.put('/update-cart',function(req,res,next)
{
  var id=req.body.cart;
  var restaurantID=id[0].restaurant_id;
  var food_id=[];

  for (i = 0; i < id.length; i++) 
  {
     
  
  con.query("UPDATE cart SET quantity='"+id[i].quantity+"' where id='"+id[i].id+"'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log("sta sam update",req.params.orderid);
          // res.send(rows);

          //next();
      }
  })
}
})
app.get('/user-info/:username',function(req,res,next)
{

  con.query("Select * from users where username='"+req.params.username+"'",function(error,rows,fields){
    if(error) console.log(error);
    else{
      console.log("Radim");
      res.send(rows);
    }
  })
});

app.put('/update-user/:username',function(req,res,next)
{
con.query("update users SET first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"',adress='"+req.body.user_address+"' where username='"+req.params.username+"'",function(error,rows,fields)
{
if(error) console.log(error);
else{
  console.log("radim");
}
})
})

app.get('/cart/:id',function(req,res,next){
  con.query("select * from cart INNER JOIN food ON cart.food_id=food.food_id where username='" + req.params.id + "'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.delete('/deletecart/:customerid/:foodid',function(req,res,next){
  con.query("delete from cart where username='" + req.params.customerid + "' and food_id='"+req.params.foodid+"'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})

app.post('/place-order/:customerid/:sellerid/:foodid/:shipName/:address',function(req,res,next){
  con.query("insert into orders (order_customer_username,order_seller_username,order_shipname,order_address) values('" +req.params.customerid + "','" +req.params.sellerid+ "','" +req.params.shipName + "','" +req.params.address + "')",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
           console.log(result);
           res.send(result);

          next();
      }
  })
  // con.connect(function(err) {
  //     if (err) throw err;
  //     var sql = "insert into orders (order_customer_username,order_seller_username,order_shipname,order_address) values('" +req.params.customerid + "','" +req.params.sellerid+ "','" +req.params.shipName + "','" +req.params.address + "')";
  //     con.query(sql, function (err, result) {
  //       if (err) throw err;
  //       console.log("1 record inserted, ID: " + result.insertId);
  //     });
});
app.post('/place-order/:customerid/:amount',function(req,res,next){
  var id=req.body.cart;
  var restaurantID=id[0].restaurant_id;
  var food_id=[];
  var orderid;
  console.log(id.length)
   con.query("insert into orders (order_customer_username,order_seller_username,order_shipname,order_address,order_amount,restaurant_id) values('" +req.params.customerid + "','" +req.params.sellerid+ "','" +req.body.shipName + "','" +req.body.address + "','"+req.params.amount+"','"+restaurantID+"')",function(error,result){
      if (error) {
  //         // handle error
      }
      else{
        console.log(result.insertId);
        orderid=result.insertId;
        for (i = 0; i < id.length; i++) 
        {
            food_id.push(id[i].food_id);
            // con.query("select food.food_name,food.food_price FROM food where food.food_id='"+id[i].food_id+"'",function(error,result){
            //  if(error)
            //  {
                            
            //  }
            // else
            // {
                            
             con.query("insert into order_details(order_id,order_food_id,quantity) values ('"+orderid+"','"+id[i].food_id+"','"+id[i].quantity+"')",function(error,result)
                {
                     console.log(result);
                     console.log("im working");
                });
             con.query("delete from cart where food_id='"+id[i].food_id+"' and username='"+req.params.customerid+"'",function(error,result)
             {
                 if(error)
                 {

                 }
                 else{
                     console.log("removed from cart");
                 }
             })                
             // }
           // });
            } 
          
           
      }
           
        });
 
});

app.get('/customer-order/:customerid',function(req,res,next)
{
  con.query("SELECT * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where order_customer_username='"+req.params.customerid+"'and order_shipped='0'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})
app.get('/customer-shippedorder/:customerid',function(req,res,next)
{
  con.query("SELECT * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where order_customer_username='"+req.params.customerid+"'and order_shipped='1'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})
app.get('/favorite/:customerid',function(req,res,next)
{
  con.query("SELECT * FROM favorite INNER JOIN food ON favorite.favorite_food_id=food.food_id WHERE username='"+req.params.customerid+"'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})
app.post('/addfavorite/:customerid/:foodid',function(req,res,next)
{
  con.query("insert into favorite (username,favorite_food_id) values('"+req.params.customerid + "','" +req.params.foodid+ "')",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log(rows);
          // res.send(rows);

          next();
      }
  })
})
app.delete('/deletefavorite/:customerid/:foodid',function(req,res,next)
{
  con.query("Delete from favorite where username='" +req.params.customerid + "' and favorite_food_id='" +req.params.foodid+ "'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log(rows);
          // res.send(rows);

          next();
      }
  })
});

//TO DO  prebaciti sledece u novi folder/file
// app.delete('/deletefood/:restaurantid/:foodid',function(res,req,next){
//     con.query("Delete from food where restaurant_id='" +req.params.restaurantid + "' and food_id='" +req.params.foodid+ "'",function(error,result){

//         if(error) console.log(error);
//         else
//         {   console.log("Radim");
      
//             // console.log(rows);
//             // res.send(rows);

//             next();
//         }
//     })
// });
app.delete('/deletefood/:resid/:foodid',function(req,res,next)
{
  con.query("Delete from food where restaurant_id='" +req.params.resid + "' and food_id='" +req.params.foodid+ "'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log(rows);
          // res.send(rows);

          next();
      }
  })
});
app.delete('/deletecategory/:resid/:categoryid',function(req,res,next)
{
  con.query("Delete from category where restaurant_id='" +req.params.resid + "' and category_id='" +req.params.categoryid+ "'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log(rows);
          // res.send(rows);

          next();
      }
  })
});
app.get('/restaurantfood/:id',function(req,res,next){
  var  ids=req.params.id;
     console.log(ids);
  con.query("select * from food where restaurant_id='" + req.params.id + "'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
// app.get('/seller-order/:sellerid',function(req,res,next)
// {
//     con.query("SELECT * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where order_seller_username='"+req.params.sellerid+"' and order_shipped='0'",function(error,rows,fields){
//         if(error) console.log(error);
//         else
//         {   console.log("Radim");
//             console.log(rows);
//             res.send(rows);
//             next();
//         }
//     });
// app.get('/seller-shippedorder/:sellerid',function(req,res,next)
// {
//     con.query("SELECT * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where order_seller_username='"+req.params.sellerid+"' and order_shipped='1'",function(error,rows,fields){
//         if(error) console.log(error);
//         else
//         {   console.log("Radim");
//             console.log(rows);
//             res.send(rows);
//             next();
//         }
//     });
// }
app.get('/seller-allorder/:restaurantid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where restaurant_id='"+req.params.restaurantid+"' and order_shipped='0' and order_preparation='0' and order_delivered='0'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.get('/customer-allorder/:customerid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where orders.order_customer_username='"+req.params.customerid+"' and order_shipped='0' and order_preparation='0' and order_delivered='0'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.get('/customer-allfood/:customerid/:orderid',function(req,res,next)
{
  con.query("SELECT  * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.order_customer_username='"+req.params.customerid+"' and order_shipped='0' and order_preparation='0' and order_delivered='0' and orders.order_id='"+req.params.orderid+"'" ,function(error,rows,fields){
    if(error) console.log(error);
    else
    {   console.log("Radim");
        console.log(rows);
        res.send(rows);
        next();
    }
})
})
app.get('/customer-allpreparationfood/:customerid/:orderid',function(req,res,next)
{
  con.query("SELECT  * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.order_customer_username='"+req.params.customerid+"' and order_shipped='0' and order_preparation='1' and order_delivered='0' and orders.order_id='"+req.params.orderid+"'" ,function(error,rows,fields){
    if(error) console.log(error);
    else
    {   console.log("Radim");
        console.log(rows);
        res.send(rows);
        next();
    }
})
})
app.get('/customer-alldeliveryfood/:customerid/:orderid',function(req,res,next)
{
  con.query("SELECT  * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.order_customer_username='"+req.params.customerid+"' and order_shipped='1' and order_preparation='0' and order_delivered='0' and orders.order_id='"+req.params.orderid+"'" ,function(error,rows,fields){
    if(error) console.log(error);
    else
    {   console.log("Radim");
        console.log(rows);
        res.send(rows);
        next();
    }
})
})
app.get('/customer-allhistoryfood/:customerid/:orderid',function(req,res,next)
{
  con.query("SELECT  * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.order_customer_username='"+req.params.customerid+"' and order_shipped='0' and order_preparation='0' and order_delivered='1' and orders.order_id='"+req.params.orderid+"'" ,function(error,rows,fields){
    if(error) console.log(error);
    else
    {   console.log("Radim");
        console.log(rows);
        res.send(rows);
        next();
    }
})
})
app.get('/seller-allpreparationorder/:restaurantid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where orders.restaurant_id='"+req.params.restaurantid+"' and order_shipped='0' and order_preparation='1'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.get('/customer-allpreparationorder/:customerid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where order_customer_username='"+req.params.customerid+"' and order_shipped='0' and order_preparation='1'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.get('/seller-alldelivery/:restaurantid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where restaurant_id='"+req.params.restaurantid+"' and order_shipped='1' and order_preparation='0'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          //next();
      }
  })
});
app.get('/customer-allshippedorder/:customerid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where order_customer_username='"+req.params.customerid+"' and order_shipped='1' and order_preparation='0'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          //next();
      }
  })
});
app.get('/customer-allhistoryorder/:customerid',function(req,res,next)
{
  con.query("SELECT  * FROM orders  where order_customer_username='"+req.params.customerid+"' and order_delivered='1' " ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          //next();
      }
  })
});
app.get('/seller-order/:restaurantid/:orderid',function(req,res,next)
{
  con.query("SELECT  * FROM orders   INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.restaurant_id='"+req.params.restaurantid+"'  and order_shipped='0' and order_preparation='0' and orders.order_id='"+req.params.orderid+"'" ,function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});
app.get('/seller-preparationorder/:restaurantid/:orderid',function(req,res,next)
{
  con.query("SELECT * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.restaurant_id='"+req.params.restaurantid+"'  and order_preparation='1' and orders.order_id='"+req.params.orderid+"'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
         // next();
      }
  })
});
app.get('/seller-shippedorder/:restaurantid/:orderid',function(req,res,next)
{
  con.query("SELECT * FROM orders INNER JOIN order_details ON orders.order_id=order_details.order_id INNER JOIN food ON food.food_id=order_details.order_food_id where orders.restaurant_id='"+req.params.restaurantid+"' and order_shipped='1' and orders.order_id='"+req.params.orderid+"'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
});

app.get('/restaurantcategory/:id',function(req,res,next)
{
  con.query("select * from category where restaurant_id='" + req.params.id + "'",function(error,rows,fields){
      if(error) console.log(error);
      else
      {   console.log("Radim");
          console.log(rows);
          res.send(rows);
          next();
      }
  })
})

app.post('/addcategory/:restaurantid/',function(req,res,next)
{
  con.query("insert into category (restaurant_id,category_name,category_image) values('"+req.params.restaurantid + "','" +req.body.categoryname+ "','" +req.body.categoryimage+ "')",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log(rows);
          // res.send(rows);

          next();
      }
  })
})
app.post('/addfood/:restaurantid/:categoryid/:foodname/:fooddescription/:foodprice/:foodimage',function(req,res,next)
{
  con.query("insert into food (restaurant_id,food_category_id,food_name,food_description,food_price,food_image) values('"+req.params.restaurantid + "','" +req.params.categoryid+ "','" +req.params.foodname+ "','" +req.params.fooddescription+ "','" +req.params.foodprice+ "','"+req.params.foodimage+"')",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log(rows);
          // res.send(rows);

          next();
      }
  })
});
app.put('/updatefood/:foodid/',function(req,res,next)
{
  con.query("UPDATE food SET food_name='"+req.body.foodname+"',food_image='"+req.body.foodimage+"',food_price='"+req.body.foodprice+"',food_description='"+req.body.fooddescription+"' where food_id='"+req.params.foodid+"'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
           console.log("OVO JE UPDATE");
          // res.send(rows);

         // next();
      }
  })
})
app.put('/updatecategory/:categoryid/',function(req,res,next)
{
  con.query("UPDATE category SET category_name='"+req.body.categoryname+"',category_image='"+req.body.categoryimage+"' where category_id='"+req.params.categoryid+"'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
           console.log("OVO JE UPDATE");
          //res.send(rows);

        //  next();
      }
  })
})
app.put('/updateorderpreparation/:orderid',function(req,res,next)
{
  con.query("UPDATE orders SET order_preparation='1' where order_id='"+req.params.orderid+"'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
           console.log("poslato u spremanje");
          // res.send(rows);

        //  next();
      }
  })
})
app.put('/updateorderarrived/:orderid',function(req,res,next)
{
  con.query("UPDATE orders SET order_delivered='1' ,order_shipped='0' where order_id='"+req.params.orderid+"'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
          // console.log("sta sam update",req.params.orderid);
          // res.send(rows);

          //next();
      }
  })
})
app.put('/updateorderdelivery/:orderid',function(req,res,next)
{
  con.query("UPDATE orders SET order_preparation='0' ,order_shipped='1' where order_id='"+req.params.orderid+"'",function(error,result){

      if(error) console.log(error);
      else
      {   console.log("Radim");
      
           console.log("poslato u delivery");
          // res.send(rows);

        //  next();
      }
  })
})
