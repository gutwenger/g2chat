import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from "../contexts/SocketProvider";
import { ACCEPT_FILES } from '../util/acceptedFiles';
import { checkMessage } from '../util/checkMessage';
import MessageCard from './MessageCard';
import UserJoin from './UserJoin';

const Conversations = ({ currentChannel, sidebarOpen, setSidebarOpen }) => {

    const { socket } = useSocket();
    const [conversations, setConversations] = useState();
    const [hasFile, setHasFile] = useState(false);
    const convoRef = useRef();
    const contentRef = useRef();
    const fileRef = useRef();
    let filename = '';

    useEffect(() => {
        socket.on("channel_messages", arg => {
            setConversations(arg);
            convoRef.current.scrollTop = convoRef.current.scrollHeight;
        });

        socket.on("user_join_channel", arg => {
        });

    }, [socket])

    function handleFileChange() {
        if (!fileRef.current.value) {
            contentRef.current.value = '';
            setHasFile(false);
            return;
        }
        filename = fileRef.current.files[0].name;
        contentRef.current.value = filename;
        setHasFile(true);
    }

    function handleSend(event) {

        event.preventDefault();

        const { id, uniqueID } = JSON.parse(localStorage.getItem("g2Chat-user"));
        const type = hasFile ? fileRef.current.files[0].type : "text";
        let content = hasFile ? fileRef.current.files[0] : contentRef.current.value;
        const channel = currentChannel;
        
        // If there's a file, check if the file type is allowed
        if (hasFile && !ACCEPT_FILES.hasOwnProperty(type) && type !== "image/png" && type !== "image/jpg") {
            setHasFile(false);
            contentRef.current.value = "";
            fileRef.current.value = "";
            return;
        };

        // Data to be sent
        const data = {
            user: { id, uniqueID },
            type,
            content,
            channel
        };

        if (type === "text") {
            // Send message
            // Validate message
            if (!checkMessage(content)) return false;

            data.content = content;

            // Send message
            socket.emit("send_message", data);
            
        } else {
            // Send Image
            const reader = new FileReader();

            // Modify reader
            reader.onload = function() {
                let readFile = reader.result;

                // Get filename
                data.filename = content.name;
                
                // Convert to base64 format 
                content = readFile.toString("base64");
                data.content = content;
                // Send message
                socket.emit("send_message", data);

                // reset hasfile
                setHasFile(false);
            };

            // Read file
            reader.readAsDataURL(content);
        }

        // Clear input field
        contentRef.current.value = "";
        fileRef.current.value = "";
    }

    return (
        <div className="conversations">
            {!sidebarOpen && <button className="menuToggle" onClick={()=>setSidebarOpen(true)}><i className="fas fa-bars"></i></button>}
            <h2 className="conversations-title">{currentChannel}</h2>
            <div id="conversations-dialog" className="conversations-dialog" ref={convoRef}>
                {conversations&& conversations.map((message, i) => (
                    message.userJoin 
                        ? <UserJoin key={`message-${i}`} message={message} /> 
                        : <MessageCard key={`message-${i}`} message={message} />
                ))}
            </div>
            <form className="conversations-form" onSubmit={(event)=>handleSend(event)}>
                <label htmlFor="fileUpload" className="conversations-form-inputfile-label"><i className="fas fa-paperclip"></i></label>
                <input id="fileUpload" className="conversations-form-inputfile" type="file" ref={fileRef} accept=".png,.jpg,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.csv" onChange={()=>handleFileChange()}></input>
                <div className="conversations-form-grp">
                    <input 
                        className="conversations-form-input" 
                        type="text" 
                        ref={contentRef}
                        disabled={hasFile}
                        required={!hasFile}
                    />
                    <button className="conversations-form-submit" type="submit"><i className="fas fa-paper-plane"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Conversations;