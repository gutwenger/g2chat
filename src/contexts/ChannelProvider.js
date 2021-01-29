import React, { useContext, useState } from 'react';
import { useSocket } from './SocketProvider';

const ChannelContext = React.createContext();

export function useChannels() {
    return useContext(ChannelContext);
}

export const ChannelProvider = ({ children }) => {
    
    const { socket } = useSocket();
    
    const [currentChannel, setCurrentChannel] = useState(null);

    function changeChannel({ channel, id }) {

        // Cannot join currentChannel
        if (channel === currentChannel) return;
        
        // Change server
        // socket.emit("change_channel", { channel, id })
        socket.emit("channel", { action: "change_channel", data: { channel, id } });

        // Set current channel
        setCurrentChannel(channel);
    }

    return (
        <ChannelContext.Provider value={{ currentChannel, changeChannel }}>
            {children}
        </ChannelContext.Provider>
    )
}

export default ChannelProvider;