const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:[String],
    files:[
        {
            filename:String,
            url:String,
            mimetype:String,
            size:Number
        }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model("notes", NoteSchema);