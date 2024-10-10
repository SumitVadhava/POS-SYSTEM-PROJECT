import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Feshmartlogo from './../utils/Fresh Mart logo.png';
const SignUp = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSignup = async () => {
        if (!data.name || !data.email || !data.password) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:7171/signup",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                navigate("/");
                toast.success("Signup successful!");
            }

        } catch (error) {
            if (error.response) {
                toast.error("Registration failed: " + error.response.data.message);
            } else if (error.request) {
                toast.error("No response from server. Please try again.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
        <div className="App">

            <nav className="navbar navbar-expand-lg navbar-light fixed-top border border-e-1">
                <div className="container">
                    <Link className="navbar-brand" to="/sign-in">
                    <img className="freshmartlogoimg" src={Feshmartlogo} alt='freshmartlogo'></img>
                    </Link>
                </div>
            </nav>
            <div className="auth-wrapper">
                <div className="auth-inner">
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Name"
                    />
                </div>


                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>

                <div className="d-grid">
                    <button
                        onClick={() => handleSignup()} 
                        className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <Link to="/">Login</Link>
                </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp;