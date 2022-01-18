import { React, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeBtn from './ThemeBtn';

export const Navbar = () => {
    let location = useLocation();

    // can comment this useEffect too as no major work it does other than console log
    useEffect(() => {
        console.log("Current page location is -> " + location.pathname);
    }, [location]);

    const handleOnSignOut = ()=> {
        localStorage.removeItem("token");
        // NOT USING useNavigate hook AS ALREADY USED react-router's `to=` PARAMETER TO ROUTE TO signin PAGE.
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Note-It</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") ?<form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/signin" role="button">Sign in</Link>    
                        <Link className="btn btn-primary mx-1" to="signup" role="button">Sign up</Link>                        
                        </form> : <Link className="btn btn-primary mx-1" to="signin" role="button" onClick={handleOnSignOut}>Sign out</Link>}
                        <ThemeBtn/>
                    </div>
                </div>
            </nav>
        </div>
    )
}
