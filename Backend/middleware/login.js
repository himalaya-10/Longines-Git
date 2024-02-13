const jwt=require("jsonwebtoken")
const JWT_secretkey="Himalaya";

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401),res.send({error:"please authenticate using valid token"})

    }
    try{
        
        const data = jwt.verify(token,JWT_secretkey);
        req.user=data.user;

        next();
    }
    catch(error){
        res.status(401),res.send({error:"please authenticate using valid token"})
    }

}
module.exports=fetchUser;