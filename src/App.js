import './App.css';
import { useState } from "react";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import SocketProvider from './contexts/SocketProvider';
import ChannelProvider from './contexts/ChannelProvider';

function App() {

    const [id, setId] = useState(null);
    const user = JSON.parse(localStorage.getItem("g2Chat-user"));

    const display = id ? <Dashboard user={user} setId={setId}/> : <Login id={id} setId={setId}/>;

    return (
        <div className="App">
            <SocketProvider setId={setId}>
                <ChannelProvider>
                    { display }
                </ChannelProvider>
            </SocketProvider>
        </div>
    );
}

export default App;
