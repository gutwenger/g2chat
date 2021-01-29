import React from 'react';
import SidebarCreateChannel from "./SidebarCreateChannel";
import ChannelList from './ChannelList';
import SidebarLoginCard from './SidebarLoginCard';

const Sidebar = ({ sidebarOpen, setSidebarOpen, setId }) => {

    let user = JSON.parse(localStorage.getItem("g2Chat-user"));

    return (
        <div id="sidebar" className="sidebar">
            {sidebarOpen && <button className="sidebar-btn" onClick={()=>setSidebarOpen(false)}><i className="fas fa-times"></i></button>}
            <div id="sidebarLogo" className="sidebarLogo">
                <i className="far fa-comment-dots"></i>
                <h1 className="sidebarLogo-h1">g2Chat</h1>
            </div>
            <SidebarCreateChannel id={ user.id } />
            <SidebarLoginCard id={ user.id } uniqueID={user.uniqueID} setId={ setId }/>
            <ChannelList id={ user.id } setSidebarOpen={setSidebarOpen} />
        </div>
    )
}

export default Sidebar;