import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { GameNotifier } from "./myWebSocket.js";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Notifier() {
    const [message, setMessage] = useState("Notifications...");

    useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);
    
        return () => {
          GameNotifier.removeHandler(handleGameEvent);
        };
    });

    function handleGameEvent(event) {
        setMessage(event);
        console.log(event);
    }

    return (
        <Alert variant="dark" id="weather-alert"> {message} </Alert>
    );
}