import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthState } from './authState';
import './login.css';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();
    const handleLogin = async () => {
        const response = await fetch('/api/auth/login', {
          method: 'post',
          body: JSON.stringify({ username, password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
    
        const body = await response.json();
      
        if (response.status === 200) {
          localStorage.setItem('userName', username);
          navigate('/challenges');
        } else {
          console.log('Error logging in');
          // Handle error state here
        }
    };

    const handleSignUp = async () => {
        const response = await fetch('/api/auth/create', {
          method: 'post',
          body: JSON.stringify({ username, password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
    
        const body = await response.json();
      
        if (response.status === 200) {
          localStorage.setItem('userName', username);
          navigate('/challenges');
        } else {
          console.log('Error creating user');
          // Handle error state here
        }
      };


    return (
        <main className="container-fluid login-main">
            <div className="login-wrapper h-100 d-flex justify-content-center align-items-center text-center">
                <div>
                    <h1> Welcome to Ninth Heaven! </h1>
                    <div className="form-wrapper">
                        <div className="px-4 py-3 mx-auto" style={{ maxWidth: "300px" }}>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="userNameForm" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="userNameForm" placeholder="Your Username" value={username} onChange={handleUsernameChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                                </div>
                                <Button variant="outline-primary" onClick={handleLogin}>Login</Button>
                                <Button variant="primary" onClick={handleSignUp}>Sign up</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    
    );
}