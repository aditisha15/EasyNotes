const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');

// Router 1: get all notes using token . login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note=await Notes.find({user:req.user.id});
        res.send(note);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

//  router 2: to add notes in db
router.post('/addnotes',fetchuser, [
    body('title',"enter a valid title").isLength({min:3}),
    body('description',"description length should be atleast 5").isLength({ min: 5 })
], (req, res) => {
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors:err.array()});
    }
    try {
        const { title, description} = req.body;
        const note=Notes({
            user:req.user.id,
            title: title,
            description: description,
        })
        note.save();
        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

// update an existing note
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title, description}=req.body;
    const newNote={};
    if(title) newNote.title=title;
    if(description) newNote.description=description;
    // if(tag) newNote.tag=tag;

    // find the note to br updated and update it
    let note=await Notes.findById(req.params.id);

    if(!note) return res.status(400).send("Not found");
    if(note.user.toString()!==req.user.id) return res.status(400).send("Not Allowed");

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);

})

// router 3: deleting an existing node.
router.delete('/deletenote/:id',fetchuser, async (req, res)=>{
    let note=await Notes.findById(req.params.id);
    try {
        // console.log(note.user);
        if(!note) return res.status(400).json("Not Found");
        if(note.user.toString()!== req.user.id) return res.status(400).send("Not Allowed");
    
        note=await Notes.findByIdAndDelete(req.params.id);
        res.send('success');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server");
    }
})

module.exports = router;