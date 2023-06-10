const jwt =require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try {
            const decoded=jwt.verify(token.split(" ")[1],'pritam')
            if(decoded){
                req.body.authorId=decoded.authorId
                req.body.author=decoded.author
                next()
            }else{
                res.send({"msg":"please Login"})
            }
        } catch (error) {
            res.send({"err":err.msg})
        }
    }else{
        res.send({"msg":"please Login"})
    }
}
module.exports={
    auth
}