/*
Two ways to do users per note.

Option 1: Relational database way
user {
    username,
    password,
    email
} 

Notes {
    title, 
    description,
    ...
    username/user_id
}

Option 2: This is more efficient, you can check the user for all their notes rather than check every single note for their user ID.

user {
    username,
    password,
    email
    notes = [note_id, note_id, note_id]
}
*/

const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: {
        type: String,
        unique: true,
        required: true
    },
    notes: [{type: mongoose.Types.ObjectId, ref: 'Note'}]
})

module.exports = User 