const Note = require("../Models/Notes");

// Create Note 
const createNote = async (req, res) => {
    try{
        const { title, content, tags } = req.body;

        const files = req.files?.map(file => ({
            filename: file.originalname,
            url: file.path,
            mimetype: file.mimetype,
            size: file.size
        })) || [];
        

        const note = new Note({
            user: req.user.id,
            title,
            content,
            tags,
            files
        })
        await note.save();
        res.status(201).json({ success:true, note })
    }catch(err){
        console.error(err);
        res.status(500).json({ success:false, message:"Server error" })
    }
}

// Get notes for logged-in user
const getNotes = async (req, res) => {
    try{
        const notes = await Note.find({ user:req.user.id, isDeleted:false });
        res.json({ success:true, notes })
    }catch(err){
        res.status(500).json({ success:false, message:"Server error" });
    }
}

// Update Note
const updateNote = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, content, tags } = req.body;

        const note = await Note.findOneAndUpdate(
            {_id: id, user: req.user.id },
            { title, content, tags },
            { new: true }
        );

        if(!note) return res.status(404).json({ success:false, message:"Note not found" });

        res.json({ success:true, note });
    }catch(err){
        console.error(err);
        res.status(500).json({ success:false, message:"Server error" });
    }
}

//Soft Delete Note
const deleteNote = async (req, res) => {
    try{
        const { id } = req.params;

        const note = await Note.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { isDeleted: true },
            { new:true }
        )

        if(!note) return res.status(404).json({ success:false, message:"Note not found" });

        res.json({ success:true, message:"Note deleted" });
    }catch(err){
        res.status(500).json({ success:false, message:"Server error" });
    }
}

// GET /api/notes/search?query=something&tag=work
const searchNotes = async (req, res) => {
    try{
        const { query, tag } = req.query;
        const filter = { user:req.user.id, isDeleted:false };

        if(query){
            filter.title = { $regex: query, $options: "i" };
        }

        if(tag){
            filter.tags = { $in: [tag] };
        }

        const notes = await Note.find(filter);
        res.json({ success:true, notes });
    }catch(err){
        console.error(err);
        res.status(500).json({ success:false, message:"Server error" });
    }
}

module.exports = { createNote, getNotes, updateNote, deleteNote, searchNotes };