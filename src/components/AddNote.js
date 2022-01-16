import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext"


export const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const handleOnAdd = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:"" })
        props.showAlert_prop("Added note successfully", "success")

    }

    const [note, setNote] = useState({title:"", description:"", tag:"" })
    const onChange = (e)=> {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setNote({...note, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <div className="w-50 mx-auto" style={{marginTop:"120px"}}>
                <h1>Add a note </h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title <span style={{color:"red", fontWeight:"bolder"}}>*</span></label>
                    <input type="text" className="form-control" id="title" placeholder="Minimum 3 charachters" onChange={onChange} minLength={3} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description <span style={{color:"red", fontWeight:"bolder"}}>*</span></label>
                    <textarea className="form-control" id="description" rows="3" placeholder="Minimum 5 charachters" onChange={onChange} minLength={5} required value={note.description}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag <span style={{color:"red", fontWeight:"bolder"}}>*</span></label>
                    <input type="text" className="form-control" id="tag" placeholder="Minimum 3 charachters" onChange={onChange} value={note.tag} />
                </div>
                <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnAdd}>Add</button>
            </div>
        </div>
    )
}
