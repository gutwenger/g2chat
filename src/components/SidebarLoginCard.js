import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from "../contexts/SocketProvider";
import { useChannels } from "../contexts/ChannelProvider";
import { checkIDInput } from "../util/checkInput";

const SidebarLoginCard = ({ id, uniqueID, setId }) => {
    
    const idRef = useRef();
    const [editID, setEditID] = useState(false);
    const [errors, setErrors] = useState([]);
    const { socket, changeIDError } = useSocket();
    const { currentChannel } = useChannels();

    useEffect(() => {
        if (changeIDError) setEditID(true);
    }, [changeIDError])

    function handleReset(event) {
        event.preventDefault();
        localStorage.removeItem("g2Chat-user");
        socket.emit("delete_id", { name: id, uniqueID });
        window.location.reload();
    }

    function handleChangeID(event) {
        event.preventDefault();
        
        const { valid, error } = checkIDInput(idRef.current.value);

        if (!valid) {
            setErrors(error);
            return;
        }

        const { id, uniqueID } = JSON.parse(localStorage.getItem("g2Chat-user"));

        socket.emit("change_id", { prevName: id, newName: idRef.current.value, uniqueID, channel: currentChannel })

        idRef.current.value = '';
        setEditID(false);

    }
    
    let display = editID
        ?   (
            <form className="sidebarLoginCard-form" onSubmit={(event)=>handleChangeID(event)}>
                <input type="text" className="sidebarLoginCard-form-input" placeholder="Enter your ID..." defaultValue={id} ref={idRef} />
                {errors && <p className="sidebarLoginCard-form-error">{errors}</p>}
                {changeIDError && <p className="sidebarLoginCard-form-error">{changeIDError}</p>}
                <div className="sidebarLoginCard-form-btngrp">
                    <button className="sidebarLoginCard-form-btn" onClick={()=>setEditID(false)}>Cancel</button>
                    <button className="sidebarLoginCard-form-btn" type="submit" >Submit</button>
                </div>
            </form>
        )
        :   (
            <p className="sidebarLoginCard-p">
                { id }
            </p>
        );

    let cardBtnGrp = !editID && (
        <div className="sidebarLoginCard-btngrp">
                <button className="sidebarLoginCard-btn" onClick={()=>setEditID(true)}>
                    <p>Change ID</p>
                </button>
                <button className="sidebarLoginCard-btn sidebarLoginCard-btn-reset" onClick={(event)=>handleReset(event)}>
                    <p>Reset</p>
                </button>
            </div>
    ) 

    return (
        <div className="sidebarLoginCard">
            <h2 className="sidebarLoginCard-h2">
                Your ID
            </h2>
            {display}
            {cardBtnGrp}
        </div>
    )
}

export default SidebarLoginCard;