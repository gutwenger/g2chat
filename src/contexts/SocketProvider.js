import React, { useContext, useEffect, useState } from 'react';
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export const SocketProvider = ({ id, setId, children }) => {
    
    const [socket, setSocket] = useState();
    const [channels, setChannels] = useState([]);
    const [createIDError, setCreateIDError] = useState(null);
    const [changeIDError, setChangeIDError] = useState(null);

    useEffect(() => {
     
        // SERVER_URL
        // const SERVER_URL = "http://localhost:5000";
        const SERVER_URL = "https://g2chat2.herokuapp.com/";

        // Create a new Socket
        const newSocket = io(
            SERVER_URL,
            { query: { id } }
        );

        // Set current socket
        setSocket(newSocket);

        newSocket.on("server_message", arg => {
            if (arg.type === "SUCCESS") {

                if (arg.data.message === "ID created successfully.") {

                    // Delete previous record
                    if (localStorage.getItem(`g2Chat-user`)) {

                        let user = JSON.parse(localStorage.getItem(`g2Chat-user`));
                        newSocket.emit("delete_id", { name: user.id, uniqueID: user.uniqueID, status: "new_login" });
                    }

                    // Store user data to localstorage
                    localStorage.setItem(`g2Chat-user`, JSON.stringify({
                        id: arg.data.account.id,
                        uniqueID: arg.data.account.uniqueID
                    }));

                    // Reset createIDError
                    setCreateIDError(null);

                    // Set current ID
                    setId(arg.data.account.id);

                } else if (arg.data.message === "ID removed successfully.") {
                    localStorage.removeItem(`g2Chat-user`);
                    setId(null);
                    window.location.reload();
                } else if (arg.data.message === "ID name changed successfully.") {
                    // Store user data to localstorage
                    localStorage.setItem(`g2Chat-user`, JSON.stringify({
                        id: arg.data.account.id,
                        uniqueID: arg.data.account.uniqueID
                    }));

                    // Set current ID
                    setId(arg.data.account.id);

                    // Remove name change error
                    setChangeIDError(null);
                } 

            } else if (arg.type === "ERROR") {
                if (arg.data.message === "ID and uniqueID does not match.") {
                    setChangeIDError(arg.data.message);
                } else {
                    setCreateIDError(arg.data.message);
                }
            }

        });

        newSocket.on("all_channels", arg => {
            setChannels(arg);
        })

        // Whenever useEffect runs the second time,
        // The old socket needs to be removed
        // Close the old socket to prevent multiple connections to the server
        return () => newSocket.close();

    }, [id, setId])

    return (
        <SocketContext.Provider value={{ socket, channels, createIDError, changeIDError }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;