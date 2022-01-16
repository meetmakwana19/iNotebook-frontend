import { React, useState } from "react"
import { useNavigate } from "react-router-dom"

export const SignUp = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", c_password: "" })

    let navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // remove them out from credentials using destructuring
        const { name, email, password } = credentials;
        // API Call
        const response = await fetch(`https://note-it-backend-api.herokuapp.com/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // sending email, password in the body
            body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
            // body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const resp = await response.json();
        console.log(resp);
        if (resp.success){
            // redirect by saving the auth-token
            localStorage.setItem("token", resp.authToken)
            // will navigate to the "/" endpoint which is the Home.js
            navigate("/")
            props.showAlert_prop("Account created successfully", "success")
        }
        else{
            // alert('User already exists with this email')
            props.showAlert_prop("User already exists with this email", "danger")
        }
    }


    const onChange = (e) => {
        // using spread operator with note means only those things will be changed in the note object which are defined after the spread operator.
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    return (
        <div style={{marginTop:"120px"}}>
            <h2>Sign up</h2>
            <form onSubmit={handleOnSubmit} className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input value={credentials.name} type="text" className="form-control" id="name" placeholder="Minimum 3 characters name" onChange={onChange} minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Please enter a valid email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={credentials.password} type="password" className="form-control" id="password" placeholder="Minimum 5 characters password" onChange={onChange} minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Comfirm Password</label>
                    <input value={credentials.password} type="password" className="form-control" id="c_password" placeholder="Please re-type the password" onChange={onChange} minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}