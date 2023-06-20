const express = require('express')
const notesRouter = express.Router();
const {getNotes, createNote, deleteAllNotes} = require('../controllers/notes_controller')

notesRouter.get("/notes", (request, response) => {
    response.json(
        {"message": "The list of notes goes here."}
    )
})

notesRouter.post("/notes", (request, response) => {
    response.json(
        {
            "note": {
                "id": 1,
                "title": "Welcome to the note taker",
                "description": "Make your notes here",
                "isCompleted": false,
                "dueDate": new Date().setDate(new Date().getDate() + 1 ),
                "createdAtDate": Date.now()
            }
        }
    )
})


notesRouter.get("/", getNotes)


notesRouter.post("/", createNote)

notesRouter.delete("/clear", deleteAllNotes)

module.exports = notesRouter