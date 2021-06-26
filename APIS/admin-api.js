const exp = require("express")
const adminApi = exp.Router();
const expressErrorHandler=require("express-async-handler")
//const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

adminApi.use(exp.json())

adminApi.post("/login",expressErrorHandler(async (req,res,next) =>{
    
    let adminCollectionObject=req.app.get("adminCollectionObject")


    let credentials= req.body;





//verify username
let user=await adminCollectionObject.findOne({username:credentials.username})
//if user is not existed
if(user===null){
    res.send({message:"invalid username"})
}
//if user is existed
else{
    //compare passwords
    //let result=await bcryptjs.compare(credentials.password,user.password)
    //if pws not matched
    if(credentials.password!==user.password){
        res.send({message:"Invalid password"})
    }
    //if passwords are matched
    else{
        //create a token and send it as result
        let token = await jwt.sign({username:credentials.username},'process.env.SECRET',{expiresIn:120})
        //remove password from user
        delete user.password;
        res.send({
            message:"login-success",
            token: token,
            username: credentials.username
            
    })

}

}

}))








//export
module.exports = adminApi;
