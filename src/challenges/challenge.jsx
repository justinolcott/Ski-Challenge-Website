import React, { useEffect } from 'react';
import { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'


export function Challenge(props) {
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
      if (props.completed === true) {
        setCompleted(true);
      }
      else {
        setCompleted(false);
      }
    }, [props]);

    const handleCheck = () => {
      props.onComplete();
      setCompleted(true);
    };

    const handleUncheck = () => {
      props.onUncomplete();
      setCompleted(false);
    };
  
    return (
        <div className='text-light'>
        <div className='d-flex align-items-center'>
        <span>
            <Button variant='primary' onClick={completed ? handleUncheck : handleCheck} className={completed ? 'bg-primary btn-sm' : 'bg-dark btn-sm'}>
              <FontAwesomeIcon icon={completed ? faCheck : faPlus} />
            </Button>
        </span>
        <h3> &nbsp;{props.title} </h3> 
        <h4>  &nbsp;&ndash;&nbsp;{props.points}</h4>
            
        </div>
        <p>{props.description}</p>
      </div>
    );
  }