import React from 'react';
import moment from "moment";
import ReactPlayer from "react-player";
import { ACCEPT_FILES } from '../util/acceptedFiles';

const MessageCard = ({ message: { id, uniqueID, type, content, filename, timestamp } }) => {
    
    const user = JSON.parse(localStorage.getItem("g2Chat-user"));

    let messageContent;

    if (ACCEPT_FILES.hasOwnProperty(type)) {
        messageContent = (
            <a download={filename} className="messageCard-file" href={content}>
                <i className={`messageCard-file-i ${ACCEPT_FILES[type]}`}></i>
                <p className="messageCard-file-p">{filename}</p>
            </a>
            )
    } else if (type === "image/jpeg" || type === "image/jpg" || type === "image/png" || type === "image/svg" || type === "image/gif") {
        messageContent = <img src={content} alt="message" className="messageCard-img"></img>;
    } else {
        messageContent = content.slice(0, 8) === "https://"
            ? content.slice(0, 17) === "https://youtu.be/" || content.slice(0, 24) === "https://www.youtube.com/"
                ? <ReactPlayer className="messageCard-vid" url={content} controls={true} />
                : <a className="messageCard-text" href={content}>{content}</a>
            : <p className="messageCard-text">{content}</p>
    }

    return (
        <div className={ user.uniqueID === uniqueID ? "messageCard messageCard-user" : "messageCard"}>
            <div className="messageCard-upper">
                <p className="messageCard-user">
                    {id}
                </p>
                { messageContent }
                <p className="messageCard-timestamp">
                    {moment(new Date(timestamp)).calendar(Date.now())}
                </p>
            </div>
        </div>
    );
}

export default MessageCard;