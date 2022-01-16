import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import { AddNote } from './AddNote';
import { NoteItem } from './NoteItem';
import { useNavigate } from "react-router-dom"

export const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")){
            // if auth-token is present, then only the notes will be fetched.
            getAllNotes()
        }
        else{
            navigate("/signin")
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // updateNote() taking whole "note" as arg.
    const updateNote = (currentNote) => {
        ref.current.click();
        // on the click of edit btn, this updateNote() will fire and update the note state as currentNote using `setNote(currentNote)` 
        setNote({id: currentNote._id, e_title: currentNote.title, e_description: currentNote.description, e_tag: currentNote.tag})
    }
    // useRef Hook
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleOnUpdateBtn = (e) =>{
        // e.preventDefault();
        // printing the "note" state too as it'll be updated.
        console.log("Updating", note);
        editNote(note.id, note.e_title, note.e_description, note.e_tag);
        refClose.current.click();
        props.showAlert_prop("Note updated successfully", "success")

    }

    const [note, setNote] = useState({id: "", e_title:"", e_description:"", e_tag:"default" })
    const onChange = (e)=> {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setNote({...note, [e.target.id]: e.target.value})
    }

    return (
        <div className='container'>
            <AddNote showAlert_prop={props.showAlert_prop}/>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="w-50 mx-auto">
                                <h1>Add a note </h1>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="e_title" placeholder="Minimum 3 charachters" value={note.e_title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="e_description" rows="3" placeholder="Minimum 5 charachters" value={note.e_description} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="e_tag" placeholder="Minimum 3 charachters" value={note.e_tag} onChange={onChange} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose}data-bs-dismiss="modal">Close</button>
                            <button disabled={note.e_title.length<3 || note.e_description.length<5} type="button" className="btn btn-primary" onClick={handleOnUpdateBtn}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your notes </h1>
            <div className="row">
                {/* if {notes.length === 0}=TRUE then the msg will be shown  */}
                <h3>{notes.length === 0 && "No notes to display. Please add a note. "}</h3>
                {notes.map((note) => {
                    // return note.title;
                    // passing the note object mapped from the variable "notes" as a prop to the NoteItem component
                    return <NoteItem key={note._id} note_prop={note} updateNote_prop={updateNote} showAlert_prop={props.showAlert_prop} />;
                })}
            </div>
        </div>
    )
}
