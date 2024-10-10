import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Feshmartlogo from './../utils/Fresh Mart logo.png'
const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:7171/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setIsLoggedIn(true); // Set user as logged in
                toast.success("Login Successful");
                navigate("/home");
                console.log("Login successful:", data);
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed. Please try again.");
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
                <h3>Login</h3>

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
                        onClick={() => handleLogin()}
                        className="btn btn-primary">
                        Login
                    </button>
                </div>
                <div className='text-center mt-2'>
                    <p>don't have account?<Link to="/signup">Sign Up</Link></p>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage;