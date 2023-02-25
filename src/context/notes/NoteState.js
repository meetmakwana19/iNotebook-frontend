// import React, {useState} from "react";
import { React, useState } from "react";
import noteContext from "./NoteContext";

// This will provide all the states of a note.
const NoteState = (props) => {
    const host = process.env.REACT_APP_ROOT_URL
    // const state1 = {
    //     "name": "Meet",
    //     "sub": "English"
    // }

    // // using useState to change the states
    // const [state, setState] = useState(state1)
    // const update = () => {
    //     setTimeout(() => {
    //         // state will be changed after 1 second
    //         setState({
    //             "name": "Tony",
    //             "sub": "Science"
    //         })
    //     }, 1000);
    // }

    const initialNotes = []

    // sending the array of initialNotes into the initial state of "notes"
    const [notes, setNotes] = useState(initialNotes)

    // Get all notes 
    const getAllNotes = async () => {
        console.log("Getting all note");

        // API Call
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const resp = await response.json();
        console.log(resp);
        setNotes(resp)
    };


    // Add notes
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            // sending title, description, tag in the body
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        console.log("Adding a new note");
        const newNote = await response.json();
        console.log(newNote);
        // concat(return an array) the resp into the "notes" state.
        setNotes(notes.concat(newNote))
    }

    // Delete note
    const deleteNote = async (id) => {
        console.log('Deleting the note with id : ' + id);

        // API Call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const resp = response.json();
        console.log(resp);
        // will filter and return those notes whose id wasn't deleted.
        const toDeleteNote = notes.filter((note) => { return note._id !== id })

        // to update the state
        setNotes(toDeleteNote)
    }

    // Edit note
    const editNote = async (id, title, description, tag) =>
    // need to edit title, description, tag too so will pass them in the arrow func too. id will be used to identify the note.
    {
        // API Call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const resp = await response.json();
        console.log(resp);

        // cannot directly update the state "notes" so parsing it in JSON into a variable and then setting it to update
        let updatedNote = JSON.parse(JSON.stringify(notes))

        // Logic to edit on the client side
        for (let index = 0; index < updatedNote.length; index++) {
            const element = updatedNote[index];
            if (element._id === id) {
                updatedNote[index].title = title;
                updatedNote[index].description = description;
                updatedNote[index].tag = tag;
                break;
            }
        }
        setNotes(updatedNote)
    }



    return (
        // Pass the state from `value={state}` using the context `noteContext`
        // a function like `update` is used to update the state.  
        // <noteContext.Provider value={{state, update}}>

        // passing both states to all the children
        <noteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;