import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const [notes, setNote] = useState([]);
    // const s ={
    //     name:"Aditi",
    //     class: "12A"
    // }
    // const [state, setState]=useState(s);
    // const update =()=>{
    //     setInterval(() => {
    //         setState({
    //             name:"Parul",
    //             class:"12B"
    //         })
    //     }, 1000);
    // }

    // Get all notes
    const getAllNotes=async()=>{
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
        });
        const json =await response.json();
        setNote(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`http://localhost:5000/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        props.showAlert("Success : Added Successfully", "success");
        getAllNotes();
    }

    // Delete a note
    const delNote = async(id) => {
        // console.log(id);
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
        });
        props.showAlert("Success : Deleted Successfully", "success");
        getAllNotes();
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {
        //  API call
        // console.log(id);
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json();
        props.showAlert("Success : Updated Successfully", "success");
        getAllNotes();
    }

    return (
        <noteContext.Provider value={{ notes, addNote, delNote , editNote, getAllNotes}}>
            {props.children};
        </noteContext.Provider>
    )
}

export default NoteState;