import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../contexts/SocketProvider";

import { checkIDInput } from "../util/checkInput";

const Login = () => {

    const idRef = useRef();
    const [errors, setErrors] = useState([]);
    const { socket, createIDError } = useSocket();
    const hasUser = localStorage.getItem("g2Chat-user") ? true : false;

    useEffect(() => {
        if (createIDError) {
            setErrors([createIDError]);
        }
    }, [createIDError, setErrors])

    function continueLogin() {
        let user = JSON.parse(localStorage.getItem("g2Chat-user"));

        socket.emit("continue_login", { name: user.id, uniqueID: user.uniqueID });
    }

    function handleSubmit(event) {
        event.preventDefault();
        let input = idRef.current.value;

        const { valid, error } = checkIDInput(input);
        
        if (!valid) {
            setErrors(prevErr => [...new Set([...prevErr, error])]);
            return;
        }

        let uniqueID = uuidv4();

        socket.emit("create_id", { name: input, uniqueID });
    }

    return (
        <div id="login" className="login">
            <div id="loginLogo" className="loginLogo">
                <h1 className="loginLogo-h1">g2Chat</h1>
            </div>
            <form className="loginForm" onSubmit={(event) => handleSubmit(event)}>
                <h1 className="loginForm-h1">Create an ID</h1>
                <input className="input-01 mv-10" type="text" ref={idRef} required></input>
                <button className="button-01" type="submit">Chat with new ID</button>
                {hasUser && (
                    <h1 className="loginForm-h1">or</h1>
                )}
                {hasUser && (
                    <button type="button" className="button-01 mt-5" onClick={()=>continueLogin()}>
                        Resume Session as {JSON.parse(localStorage.getItem("g2Chat-user")).id}
                    </button>
                )}
                {errors.length > 0 && (
                    <ul className="loginForm-errorbox">
                      {errors.map((error, i) => <li key={`loginformerror${i}`} className="loginForm-error">{error}</li>)}
                    </ul>    
                )}
            </form>
        </div>
    )
}

export default Login;