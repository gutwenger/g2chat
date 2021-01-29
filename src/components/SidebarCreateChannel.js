import React, { useRef } from 'react';
import { useSocket } from "../contexts/SocketProvider";

const SidebarCreateChannel = ({ id }) => {

    const channelRef = useRef(null);
    const { socket } = useSocket();

    function createRoom(event) {

        // Prevent default
        event.preventDefault();

        // Create a channel on server
        socket.emit("channel", { action: "create_channel", data: { channel: channelRef.current.value, id } });

        // Reset input
        channelRef.current.value = '';
    }
    
    return (
        <div id="sidebarCreateChannel" className="sidebarCreateChannel">
            <form id="sidebarCreateChannel-form" className="sidebarCreateChannel-form" onSubmit={(event)=>createRoom(event)}>
                <h3 className="sidebarCreateChannel-h3">Create a new Channel</h3>
                <input className="input-01" type="text" placeholder="Create a channel..." ref={channelRef} required></input>
                <button className="button-01 mt-5">Create</button>
            </form>
        </div>
    )
}

export default SidebarCreateChannel;