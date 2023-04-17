import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createChallenge.css';
import { v4 as uuidv4 } from 'uuid';


export function CreateChallenge() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handlePointsChange = (event) => {
        setPoints(event.target.value);
    }

    const navigate = useNavigate();
    const handleCreate = async () => {
        console.log("saving new challenge");
        
        const challenge = {
            name: name,
            description: description,
            points: points,
            id: uuidv4()
        }
        console.log(challenge);


        try {
            const response = await fetch('/api/newchallenge', {
                method: 'POST',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(challenge),
            });

            const responseText = await response.text();
            if (responseText) {
                const challenges = JSON.parse(responseText);
                localStorage.setItem('challenges', JSON.stringify(challenges));
            } else {
                console.log("adding challenge error: empty response");
            }
        }
        catch {
            //update locally
            console.log("adding challenge error");
        }

        navigate('/challenges');
    }

    return (
        <main className="container-fluid login-main">
            <div className="login-wrapper h-100 d-flex justify-content-center align-items-center text-center">
                <div>
                    <h1> Create a Challenge! </h1>
                    <div className="form-wrapper">
                        <div className="px-4 py-3 mx-auto" style={{ maxWidth: "300px" }}>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Challenge Name</label>
                                    <input type="text" className="form-control" placeholder="Challenge Name" value={name} onChange={handleNameChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Challenge Description</label>
                                    <input type="text" className="form-control" placeholder="Challenge Description" value={description} onChange={handleDescriptionChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Points</label>
                                    <input type="number" className="form-control" placeholder="500" value={points} onChange={handlePointsChange}></input>
                                </div>
                                <Button variant="outline-primary" onClick={handleCreate}>Create</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}