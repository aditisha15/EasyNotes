import React from 'react'
import { Link } from 'react-router-dom'
// import noteContext from '../context/noteContext';

export default function About({text}) {
  // const a=useContext(noteContext);
  // useEffect(()=>{
  //   a.update();
  //   // eslint-disable-next-line
  // },[]);
  return (
    <div>
      {/* <h1>this is about {a.state.name} and she is in {a.state.class}</h1> */}
      <div  className='d-flex justify-content-center my-5'>
      <h1 className={`text-${text}`}>About Us</h1>
      </div>
      <div  className={`container text-${text}`}>Welcome to EasyNotes, your ultimate destination for organizing your thoughts, ideas, and tasks effortlessly. At EasyNotes, we understand the importance of capturing inspiration on-the-go, staying organized, and bringing simplicity to your daily life.<br/><br/>Our mission is to empower individuals to declutter their minds and streamline their productivity through intuitive note-taking solutions. We believe that everyone deserves a tool that seamlessly adapts to their unique needs, whether it's jotting down a quick reminder, outlining a project, or brainstorming ideas for your next big venture.
      <br/>
      <br/>
      EasyNotes gives you the functionality to add new notes, to edit the existing note and to delete the note.
      <br/>You can change theme of the EasyNotes to dark or light as your preference.
      <br/>
      <br/>
      To get started with EasyNotes. You have to <Link to="http://localhost:3000/signup">Signup</Link> or <Link to='http://localhost:3000/login'>Login</Link>, if already have an account.
      </div>
    </div>
  )
}
