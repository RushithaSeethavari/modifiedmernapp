//create express app
const exp=require('express')
const app=exp();
const path = require("path")
require('dotenv').config()


//connecting build of react with current server
 app.use(exp.static(path.join(__dirname,'./build/')))

//import apis
const userApi = require("./APIS/user-api")
const adminApi = require("./APIS/admin-api")
const productApi = require("./APIS/product-api")




//execute specific api based on path
app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/product',productApi)


//import mongo client
const mongoClient = require("mongodb").MongoClient;


//db connection url
const dburl=process.env.DATABASE_URL;


//connect with mongodb
mongoClient.connect(dburl, {useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{

    if(err){
        console.log("err in db connection",err)
    }
    else{
        let databaseObject = client.db("rushitha")

        //create database object
        let userCollectionObject=databaseObject.collection("usercollections")
        let adminCollectionObject=databaseObject.collection("admincollection")
        let productCollectionObject=databaseObject.collection("productcollection")
        let userCartCollectionObject=databaseObject.collection("usercartcollection")
       


        //sharing collection object
        app.set("userCollectionObject",userCollectionObject)
        app.set("adminCollectionObject",adminCollectionObject)
        app.set("productCollectionObject",productCollectionObject)
        app.set("userCartCollectionObject",userCartCollectionObject)
        
        console.log("DB connection success")
    }


})



app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'),function (err){
        if(err){
            res.status(500).send(err)
        }
    })
})

//handle invallid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

//handle errors
app.use((err,req,res,next)=>{
    console.log(err)
    res.send({message:err.message})
})




//assign port
const port=process.env.PORT||4000;
app.listen(port,()=>console.log(`server listening on port ${port}...`))