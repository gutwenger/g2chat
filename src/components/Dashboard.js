import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Main from "./Main";

const Dashboard = ({ id, setId }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        })
    }, [setSidebarOpen])


    return (
        <div id="dashboard" className="dashboard">
            {sidebarOpen && <Sidebar id={id} setId={ setId } sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
            <Main id={id} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
    )
}

export default Dashboard;
