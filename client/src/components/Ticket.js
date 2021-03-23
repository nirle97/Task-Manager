import axios from "axios"
import '../styles/Ticket.css';
import React, {useState, useEffect, useRef} from "react";
import env from "react-dotenv";

function Ticket({title, content, userEmail, done, creationTime, labels}) {
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <p className="ticket-content">{content}</p>
            <span className="info">
                <p className="user-email">By {userEmail} | </p>
                <p className="creation-time">{creationTime}</p>
            </span>
            {labels &&
            labels.map(label => <span className="label">{label}</span>)
            }
        </div>
    )
}

export default Ticket;
