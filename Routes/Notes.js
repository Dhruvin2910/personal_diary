const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../Middleware/Auth");
const { createNote, updateNote, deleteNote, getNotes, searchNotes } = require("../Controllers/Note");
const upload = require("../Middleware/upload");

//Protected Routes
router.post("/", ensureAuthenticated, upload.array("files"), createNote);
router.get("/", ensureAuthenticated, getNotes);
router.put("/:id", ensureAuthenticated, updateNote);
router.delete("/:id", ensureAuthenticated, deleteNote);
router.get("/search", ensureAuthenticated, searchNotes);

module.exports = router;