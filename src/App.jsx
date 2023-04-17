import React from 'react';

import logo from './logo.png';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link , Route, Routes, useNavigate } from 'react-router-dom';

import { AuthState } from './login/authState.js';
import { Home } from './home/home.jsx';
import { Login } from './login/login.jsx';
import { ChallengesScreen } from './challenges/challenges.jsx';
import { CreateChallenge } from './create-challenge/createChallenge.jsx';

function App() {
  const [userName] = React.useState(localStorage.getItem('userName') || '');

  // Asynchronously determine if the user is authenticated by calling the service
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userName');
    setAuthState(AuthState.Unauthenticated);
    navigate('/');
  };


  return (
    <div className="App">
      <div className='bg-dark' id="body">
        <header className="p-0">
            <Navbar bg="dark" variant="dark" expand="lg" id="navbar" fluid="true">
                <Link to="/" className="navbar-brand">
                    <img src="public/assets/images/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                    NINTH HEAVEN
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto text-light">
                        <NavItem>
                            <NavLink as={Link} to="" exact="true">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            {authState === AuthState.Unauthenticated && (
                              <NavLink as={Link} to="/login">Sign-in</NavLink>
                            )}
                        </NavItem>
                        <NavItem>
                            {authState === AuthState.Authenticated && (
                              <NavLink as={Link} to="/challenges">Challenges</NavLink>
                            )}
                        </NavItem>
                        <NavItem>
                            {authState === AuthState.Authenticated && (
                                <NavLink href="#" onClick={logout}>Logout</NavLink>
                            )}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>


        <main>
        <Routes>
          <Route
            path='/'
            element={<Home authState={authState}/> }
            exact="true"
          />
          <Route path='/login' element={<Login setAuthState={setAuthState}/>} />
          <Route path='*' element={<NotFound />} />
          <Route path='/challenges' element={<ChallengesScreen />} />
          <Route path='/create-challenge' element={<CreateChallenge />} />
        </Routes> 
        </main>

        <footer className="footer py-3 bg-dark">
          <div className="container">
              <span className="text-muted">Created by Justin Olcott. For skiers by a skier! :) </span>
              <span className="float-right"><a className="link-secondary" href="https://github.com/justinolcott/startup">Github Repo</a></span>
          </div>
        </footer>
        </div>
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-dark text-light'>404: Return to sender. Address unknown.</main>;
}

export default App;
