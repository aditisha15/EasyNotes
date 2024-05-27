// import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ toggleMode,mode, text}) {
    let a = useLocation();
    let navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }
    return (
        <div>
            <nav className={`navbar navbar-expand-lg bg-${mode === 'light' ? 'warning' : mode}`} style={{boxShadow:"2px 2px 10px 2px grey"}}>
                <div className="container-fluid">
                    <h1 className={`navbar-brand text-${text}`}>EasyNotes</h1>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${a.pathname === '/EasyNotes' ? "active" : ""} text-${text}`} aria-current="page" to="/EasyNotes">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${a.pathname === '/about' ? "active" : ""} text-${text}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('authToken') ? <form className="d-flex" role="search">
                            <button type="button" className={`btn text-${text} mx-2 bg-transparent border-${text}`} onClick={toggleMode}>{text}</button>
                            <Link className={`btn text-${text} mx-2 bg-transparent border-${text}`} to="/login" role="button">Login</Link>
                            <Link className={`btn text-${text} mx-2 bg-transparent border-${text}`} to="/signup" role="button">Signup</Link>
                        </form> :
                            <div>
                                <button type="button" className={`btn text-${text} mx-2 bg-transparent border-${text}`} onClick={toggleMode}>{text}</button>
                                <button type="button" className={`btn text-${text} mx-2 bg-transparent border-${text}`} onClick={handleLogOut}>Log Out</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
