import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = ({text, showAlert}) => {
    const notecontext = useContext(noteContext);
    const { notes, getAllNotes, editNote } = notecontext;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            // eslint-disable-next-line
            getAllNotes();
        } else {
            // eslint-disable-next-line
            navigate("/login");
        }
    }, // eslint-disable-next-line
    [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [data, setdata] = useState({
        eid: "",
        etitle: "",
        edescription: "",
        etag: ""
    });

    const updateNote = (curnote) => {
        ref.current.click();
        setdata({ eid: curnote._id, etitle: curnote.title, edescription: curnote.description, etag: curnote.tag })

    }

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const handleSaveChanges = () => {
        editNote(data.eid, data.etitle, data.edescription, data.etag);
        refClose.current.click();
    }
    return (
        <div className='container row my-5'>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mx-4 my-2">
                                {/* <label htmlFor="title">Title</label> */}
                                <input type="text" className="form-control border-0 text-capitalize" style={{boxShadow:"none", fontWeight:"bold"}} id="etitle" name="etitle" value={data.etitle} onChange={handleChange} placeholder='title'/>
                            </div>
                            <div className="form-group mx-4 my-2">
                                {/* <label htmlFor="description">Description</label> */}
                                <textarea className="form-control border-0" style={{boxShadow:"none"}} id="edescription" rows="12" name="edescription" value={data.edescription} onChange={handleChange} placeholder='Write your note here...'></textarea>
                            </div>
                            {/* <div className="form-group mx-4 my-2"> */}
                                {/* <label htmlFor="tag">Tag</label> */}
                                {/* <textarea className="form-control border-0" style={{boxShadow:"none"}} id="etag" rows="3" value={data.etag} placeholder='Add a tag' name="etag" onChange={handleChange}></textarea>
                            </div> */}
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={data.etitle.length < 3 || data.edescription.length < 5} type="button" className="btn btn-dark" onClick={handleSaveChanges}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='conatiner d-flex justify-content-start'>
                <lord-icon
                    src="https://cdn.lordicon.com/xpgofwru.json"
                    trigger="hover"
                    style={{ width: "45px", height: "46px" }}>
                </lord-icon>
            </div> */}
            <p className='mx-2'>{notes.length === 0 && <p className={`text-${text}`}>No notes to display</p>}</p>
            {Array.isArray(notes) && notes.map((prop) => {
                return <NoteItem key={prop._id} note={prop} updateNote={updateNote} text={text} showAlert={showAlert}/>
            })}
        </div>
    )
}

export default Notes;

