import React from 'react';
import Conversations from './Conversations';
import { useChannels } from "../contexts/ChannelProvider";

import chatnow from "../img/chatnow.png";

const Main = ({ sidebarOpen, setSidebarOpen }) => {

    const { currentChannel } = useChannels();
    
    let display = currentChannel 
        ? <Conversations currentChannel={currentChannel} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 
        : (
            <div className="noSelectedChannel">
                <img src={chatnow} alt="chat" className="noSelectedChannel-img"/>
                <h3 className="noSelectedChannel-h3">
                    {!sidebarOpen && <button className="menuToggle" onClick={()=>setSidebarOpen(true)}><i className="fas fa-bars"></i></button>}
                    Please select a channel to start!
                </h3>
            </div>
          );

    return (
        <div id="main" className="main">
            {display}
        </div>
    )
}

export default Main;