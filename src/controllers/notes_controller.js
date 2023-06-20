const { response } = require('express')
const Note = require('../models/notes')

const getNotes = async (request, response) =>{

    let notes = await Note.find()
    response.send(notes)
}

const getNote = async (request, response) => {
    let note = await Note.findById(request.params.id)
                        .catch(error => {
                            console.log("Error: \n" + error)
                            response.status(404)
                            response.json({
                                error: "id not found in the database"
                            })
                        })
    response.send(note)
}

const createNote = async (request, response) => {
    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1),
        createdAtDate: Date.now()
    })
    await newNote.save()
    response.status(201)
    response.json({note: newNote})
}

const updateNote = async (request, response) => {
    // setting new to true makes you recieve the updated note. 
    let updatedNote = await Note.findByIdAndUpdate(request.params.id, request.body, {new: true})
                                .catch(error =>{
                                    console.log("An error occured: \n" + error)
                                })
    // if we can find the note, we will update it.
    if (updatedNote) {
        response.send(updatedNote)
    } else { // if the id doesn't exist, the note will be undefined and will return an error message.
        response.json({error: "id not found."})
    }
    
}

const deleteAllNotes = async (request, response) => {
    await Note.deleteMany({})
    response.json({
        "message": "All notes deleted"
    })
}

const deleteNote = async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
                .catch(error => {
                console.log("Error: \n" + error)
                response.status(404)
                response.json({
                    error: "id not found in the database"
        })
    })
    response.json({
        "message": "Note Deleted."
    })
}

module.exports = {getNotes, createNote, deleteAllNotes, getNote, deleteNote, updateNote}