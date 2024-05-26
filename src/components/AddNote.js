import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/noteContext';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useNavigate } from 'react-router-dom';


export default function AddNote({text, mode}) {
    const context = useContext(noteContext);
    const { addNote } = context;
    // const navigate = useNavigate();

    const [data, setdata] = useState({ title: " ", description: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(data.title, data.description);
        setdata({ title: "", description: "" })
        // navigate("/");
        ref.current.click();
    }

    const handleChange = (e) => {
        setdata({
            ...data, [e.target.name]: e.target.value
        })
    }
    // const [value, setValue] = useState('');
    const ref = useRef(null);
    const handleicon = () => {
        ref.current.click();
    }
    return (
        <div className='my-5'>
            <div className='d-flex justify-content-center'>
                <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover"
                    colors={text==='light'?`primary:#ffffff`:'primary:black'}
                    style={{ width: "45px", height: "46px", cursor: "pointer", color:"red"}}
                    onClick={handleicon}>
                </lord-icon>
                <h1 className={`text-${text}`}>Add Note</h1>
            </div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group my-3 ">
                                    <label htmlFor="title" className='mx-2' style={{cursor:'default'}}>Title</label>
                                    <input type="text" className="form-control border-0 text-capitalize" style={{ boxShadow: "none", fontWeight: "bold" }} id="title" name="title" value={data.title} onChange={handleChange} />
                                </div>
                                <div className="form-group my-3">
                                    {/* <label htmlFor="description">Write your note here...</label> */}
                                    <textarea className="form-control border-0" id="description" style={{ boxShadow: "none"}} rows="12" name="description" value={data.description} onChange={handleChange} placeholder='Write your note here...'></textarea>
                                </div>
                                {/* <div className="form-group my-3"> */}
                                    {/* <label htmlFor="tag">Tag</label> */}
                                    {/* <textarea placeholder='add a tag' className="form-control border-0" style={{ boxShadow: "none" }} id="tag" rows="3" value={data.tag} name="tag" onChange={handleChange}></textarea> */}
                                {/* </div> */}
                                {/* <button disabled={data.title.length < 3 || data.description.length < 5} type="submit" className="btn btn-primary my-3" onClick={handleSubmit}>Add</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={data.title.length < 3 || data.description.length < 5} type="submit" className="btn btn-dark" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
