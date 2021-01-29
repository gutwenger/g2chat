import React, { useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();

export function useConversation() {
    return useContext(ConversationContext);
}

export const ConversationProvider = ({ children }) => {
    
    const { socket } = useSocket();
    const [conversations, setConversations] = useState([]);
    
    useEffect(() => {
        if (socket) {
            socket.on("channel_messages", arg => {
                setConversations(arg);
            }) 
        }
    }, [socket, conversations, setConversations])

    return (
        <ConversationContext.Provider value={{ conversations }}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider;