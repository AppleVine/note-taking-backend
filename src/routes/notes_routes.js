const express = require('express')
const notesRouter = express.Router();
const {getNotes, createNote, deleteAllNotes, getNote, deleteNote, updateNote, getMyNotes} = require('../controllers/notes_controller')

notesRouter.get("/", getNotes)

notesRouter.get("/my_notes", getMyNotes)

notesRouter.get("/:id", getNote)

notesRouter.post("/", createNote)

notesRouter.delete("/clear", deleteAllNotes)

notesRouter.delete("/:id", deleteNote)

notesRouter.put("/:id", updateNote)

module.exports = notesRouter