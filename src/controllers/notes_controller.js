const { response } = require('express')
const Note = require('../models/notes')
const User = require('../models/user')

const getNotes = async (request, response) =>{ // For example, if you look at /notes?isCompleted=true it'll return {isCompleted: "true"}

    let notes

    if (Object.keys(request.query).length > 0) {
        if (request.query.isCompleted ==='true') {
            notes = await Note.find({isCompleted: true})
        } else if (request.query.isCompleted ==='false') {
            notes = await Note.find({isCompleted: false})
        } else {
            notes = await Note.find()
        }
        response.send(notes)
    } else {
        let notes = await Note.find()
        response.send(notes)
    }
}

const getMyNotes = async(request, response) => {
    // find user by username. Once we have auth, we get this through the token instead. 
    let user = await User.findOne({username: request.body.username}).populate('notes')
    response.send(user.notes)
    // response.send(user.notes)
    
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
    let user = await User.findOne({username: request.body.username})

    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1),
        createdAtDate: Date.now()
    })
    await newNote.save()
    user.notes.push(newNote._id)
    await user.save()
    response.status(201)
    response.json({
        note: newNote,
        user: user
    })
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
    let user = await User.findOne({username: request.body.username})

    note = await Note.findByIdAndDelete(request.params.id)
                .catch(error => {
                console.log("Error: \n" + error)
            })

    if (note) {
        // remove the note_id from the user's note array.
        user.notes.shift(note._id);
        response.json({"message": "Note Deleted."})
    } else {
        response.json({error: "id not found"})
    }

    
}

module.exports = {getNotes, createNote, deleteAllNotes, getNote, deleteNote, updateNote, getMyNotes}