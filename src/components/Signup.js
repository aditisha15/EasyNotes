import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Signup({showAlert , text}) {
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const response = await fetch(`${window.location.origin}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
      showAlert("Success: Registered Successfully", "success");
      localStorage.setItem('authToken' , json.authToken);
      navigate("/EasyNotes");
    }else{
      // alert("Invalid Credentials");
      showAlert("Error: Invalid Credentials", "danger");
    }
  }

  return (
    <div className='my-5'>
      <h2 className={`d-flex align-items-center flex-column my-5 text-${text}`}>Create New Account To Get Started With EasyNotes</h2>
      <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column my-5'>
        <div className="form-group col-md-6 my-3">
          <label htmlFor="inputEmail4" className={`text-${text}`}>Name</label>
          <input type="text" className={`form-control bg-transparent text-${text}`} id="inputName" name="name"  placeholder="Name" />
        </div>
        <div className="form-group col-md-6 my-3">
          <label htmlFor="inputEmail4" className={`text-${text}`}>Email</label>
          <input type="email" className={`form-control bg-transparent text-${text}`} id="inputEmail" name="email"  placeholder="Email" />
        </div>
        <div className="form-group col-md-6 my-3">
          <label htmlFor="inputPassword4" className={`text-${text}`}>Password</label>
          <input type="password" className={`form-control bg-transparent text-${text}`} id="inputPassword" name="password" placeholder="Password" />
        </div>
        <button type="submit" className={`btn btn-${text} my-4`}>Signup</button>
      </form>
    </div>
  )
}
