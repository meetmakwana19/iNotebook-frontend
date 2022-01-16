import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"

export const NoteItem = (props) => {

    // getting out content from the prop passed by Notes.js
    const { note_prop, updateNote_prop } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        // Want 3 columns, so 12/3=4
        <div className='col-md-4'>
            <div className="card my-2">
                <div className="card-header text-dark bg-warning">
                    <i className="fas fa-tag me-3"></i>
                    {note_prop.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note_prop.title}</h5>
                    <p className="card-text">{note_prop.description}</p>
                    <i className="far fa-trash-alt mx-2 float-end" onClick={()=>{
                        deleteNote(note_prop._id); 
                        props.showAlert_prop("Deleted successfully", "success");}}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>(updateNote_prop(note_prop))}></i>
                </div>
            </div>
        </div>
    )
}