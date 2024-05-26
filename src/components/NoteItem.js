import React, { useContext } from 'react'
import noteContext from '../context/noteContext';

const NoteItem = (prop) => {
    const { note, updateNote, text } = prop;
    const context = useContext(noteContext);
    const { delNote } = context;
    const handlecopy=()=>{
        const text=note.title +" "+ note.description;
        navigator.clipboard.writeText(text);
        prop.showAlert("Successfully copied to clipboard", "success");
    }
    return (
        <div className='col-md-3 my-3'>
            {/* {note.title} */}
            <div className={`card shadow-sm p-3 mb-5 bg-transparent rounded ${text === 'light' ? 'border-white' : ""}`} >
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className={`card-title text-${text}`}>{note.title}</h5>
                        <div className='d-flex justify-content-end'>
                            <svg className='mx-2' onClick={handlecopy} style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                            </svg>
                            <lord-icon
                                src="https://cdn.lordicon.com/lsrcesku.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#545454,tertiary:#000000,quaternary:#ebe6ef"
                                style={{ width: "30px", height: "27px", cursor: "pointer" }}
                                onClick={() => { updateNote(note) }}>
                            </lord-icon>
                            <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                colors={text === 'light' ? `primary:#ffffff` : 'primary:black'}
                                style={{ width: "30px", height: "27px", cursor: "pointer" }}
                                onClick={() => { delNote(note._id) }}>
                            </lord-icon>
                        </div>
                    </div>
                    {/* <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6> */}
                    <p className={`card-text card-title text-${text}`}>{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
