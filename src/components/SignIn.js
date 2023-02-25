import { React, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import themeContext from "../context/theme/ThemeContext";

const ROOT = process.env.REACT_APP_ROOT_URL;
// console.log("env url is................." + ROOT);

export const SignIn = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // API Call
        // const response = await fetch(`http://localhost:5000/api/auth/login`, {
        const response = await fetch(`${ROOT}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // sending email, password in the body
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const resp = await response.json();
        // console.log(resp);
        if (resp.success) {
            // redirect by saving the auth-token
            localStorage.setItem("token", resp.authToken)
            // will navigate to the "/" endpoint which is the Home.js
            navigate("/")
            props.showAlert_prop("Logged in successfully", "success")

        }
        else {
            // alert('Invalid Credentials')
            props.showAlert_prop("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    const { darkMode } = useContext(themeContext)

    let myStyle = {
        backgroundColor: "#505157",
        color: "white",
    }

    return (
        <div style={{ marginTop: "120px" }}>
            <h2>Sign in</h2>
            <form onSubmit={handleOnSubmit} className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} style={darkMode ? myStyle : null} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={credentials.password} type="password" className="form-control" id="password" onChange={onChange} style={darkMode ? myStyle : null} />
                </div>

                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}
