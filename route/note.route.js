const express=require('express')
const { NoteModel } = require('../model/note.modle')
const noteRoute=express.Router()


noteRoute.post('/create',async(req,res)=>{
try {
    const note=new NoteModel(req.body)
    await note.save()
    res.status(200).send({"msg":"New note has been added"})
} catch (error) {
    res.status(400).send({"err":error})
}
})

noteRoute.get('/',async(req,res)=>{
    try {
        const users=await NoteModel.find({authorId:req.body.authorId})
    res.send(users)
    } catch (error) {
        console.log(error)
    }
})

noteRoute.patch('/update/:noteId', async(req,res)=>{
    const {noteId}=req.params;
    const note=await NoteModel.findOne({_id:noteId})
    try {
        if(req.body.authorId!==note.authorId){
            res.status(200).send({"msg":"Permission denied"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
            res.send("Note updated")
        }
    } catch (error) {
        console.log(error)
    }
})

noteRoute.delete('/delete/:noteId',async(req,res)=>{
    const noteId=req.params.noteId
    const note=await NoteModel.findOne({_id:noteId})
    try{
        if(req.body.authorId!==note.authorId){
            res.status(200).send({"msg":"Permission denied"})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteId})
            res.send(`Note with note id ${noteId} has been deleted from the database`)
        }
    }catch(err){
    console.log(err)
    res.send({"err":"something went wrong"})
    }
})
module.exports={noteRoute}