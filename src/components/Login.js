import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login({showAlert, text}) {

  let navigate = useNavigate();
  const [entry, setEntry] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${window.location.origin}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: entry.email, password: entry.password }),
    })
    const json=await response.json();
    console.log(json.authToken);
    if(json.success){
      showAlert("Success : Registered Successfully", "success");
      localStorage.setItem('authToken' , json.authToken);
      navigate("/EasyNotes");
    }else{
      showAlert(`Error : Invalid Credentials `, "danger");
      // alert("Invalid Credentials");
    }     
  }

  return (
    <div className='my-5'>
      <div>
      <h2 className={`d-flex align-items-center flex-column my-5 text-${text}`} >Login To Access your Notes</h2>
      </div>
      <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column'>
        <div className="form-group col-md-6 my-3">
          <label htmlFor="inputEmail4" className={`text-${text}`}>Email</label>
          <input type="email" name="email" className={`form-control bg-transparent text-${text}`} id="inputEmail4" value={entry.email} onChange={handleChange} placeholder="Email"/>
        </div>
        <div className="form-group col-md-6 my-4">
          <label htmlFor="inputPassword4" className={`text-${text}`}>Password</label>
          <input type="password" name='password' className={`form-control bg-transparent text-${text}`} id="inputPassword4" onChange={handleChange} value={entry.password} placeholder="Password" />
        </div>
        <button type="submit" className={`btn btn-${text} my-4`}>Login</button>
      </form>
    </div>
  )
}
