import React from 'react';
import { useChannels } from "../contexts/ChannelProvider"; 
import { useSocket } from '../contexts/SocketProvider';

const ChannelCard = ({ id, channel, setSidebarOpen }) => {

    const { changeChannel } = useChannels();

    function handleClick() {
        changeChannel({ channel, id });
        if (window.innerWidth < 600) {
            setSidebarOpen(false);
        }
    }

    return (
        <div id={`channelCard-${channel}`} className="channelCard" onClick={()=>handleClick()}>
            <p className="channelCard-p">{channel}</p>
        </div>
    )
}

const ChannelList = ({ id, setSidebarOpen }) => {

    const { channels } = useSocket();

    return (
        <div className="channelList">
            <div className="channelListTitle">
                <h2 className="channelListTitle-h2">
                    Channels
                </h2>
            </div>
            <div className="channelListCon">
                {channels.map(item => (
                    <ChannelCard key={`channelcard${item}`} channel={item} id={id} setSidebarOpen={setSidebarOpen} />
                ))}
            </div>
        </div>
    )
}

export default ChannelList;