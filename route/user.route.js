const express=require('express')
const { UserModel } = require('../model/user.model')
const router=express.Router()
var jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth.middleware');
const bcrypt = require('bcrypt');
router.get('/',(req,res)=>{
    res.status(200).send({"msg":"welcome to user page"})
})
router.post('/register',async(req,res)=>{
    const {username,password}=req.body
    try {
        bcrypt.hash (password, 5, async(err, hash)=>{
            if(err){
                 res.status(500).send({"msg":"register failed"})
            }
            const user=new UserModel({username,password:hash})
            await user.save()
        });
        res.status(200).send({"msg":"New User Added"})       
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    try {
        const user= await UserModel.findOne({username})
        // console.log(user.password)
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({authorId:user._id,author:user.username}, 'pritam');
                    res.status(200).send({"msg":"Login Successfull","token":token})
                }else{
                    res.status(200).send({"msg":"Wrong Credential"})
                }
            });
        }else{
            res.status(200).send({"msg":"Wrong Credential"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

router.get("/posts",auth,(req,res)=>{
    res.status(200).send({"msg":"posts data"})
})
module.exports={router}
