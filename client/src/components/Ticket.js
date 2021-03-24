import axios from "axios"
import '../styles/Ticket.css';
import React, {useState, useEffect} from "react";
import env from "react-dotenv";

function Ticket({title, content, userEmail, creationTime, labels, hideTicket}) {
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <a onClick={hideTicket} className="hideTicketButton">Hide</a>
            <p className="ticket-content">{content}</p>
            <span className="info">{userEmail} | {creationTime}</span>
            {labels.length > 0 &&
                labels.map((label, i) => <span key={`label - ${i}`} className="label">{label} </span>)
            }
        </div>
    )
}

export default Ticket;