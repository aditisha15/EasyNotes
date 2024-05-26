import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/noteState';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {

  const [mode, setMode]=useState('light');
  const [text, setText]=useState('dark');
  const [alert, setAlert]=useState(null);

  const showAlert=(msg, colour)=>{
    setAlert({
      msg:msg,
      colour:colour
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode=()=>{
    if(mode==='light'){
      setMode('black');
      setText('light');
      document.body.style.backgroundColor="black";
    }else{
      setMode('light');
      setText('dark');
      document.body.style.backgroundColor="white";
    }
  }
  return (
    <div>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar toggleMode={toggleMode} mode={mode} text={text}/>
          <Alert alert={alert}/>
          <div className='container my-4'>
            <Routes>
              <Route path="/EasyNotes" element={<Home showAlert={showAlert} mode={mode} text={text}/>}></Route>
            </Routes>
            <Routes>
              <Route path="/about" element={<About text={text}/>}></Route>
            </Routes>
            <Routes>
              <Route path="/login" element={<Login showAlert={showAlert} text={text}/>}></Route>
            </Routes>
            <Routes>
              <Route path="/signup" element={<Signup showAlert={showAlert} text={text}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
