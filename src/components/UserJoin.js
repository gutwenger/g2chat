import React from 'react';
import moment from "moment";

const UserJoin = ({ message: {userJoin, timestamp} }) => {
    return (
        <div className="userJoin">
            <p className="userJoin-user">
                {userJoin}
            </p>
            <p className="userJoin-timestamp">
                {moment(new Date(timestamp)).calendar(Date.now())}
            </p>
        </div>
    )
}

export default UserJoin;