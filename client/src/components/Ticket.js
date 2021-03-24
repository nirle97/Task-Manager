import '../styles/Ticket.css';
import React, { useEffect } from "react";

function Ticket({title, content, userEmail, creationTime, labels, hideTicket, filterByLabel}) {
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <span>
                {labels &&
                    labels.map((label, i) => <span onClick={filterByLabel} key={`label - ${i}`} className="label">{label} </span>)
                }
            </span>
            <a onClick={hideTicket} className="hideTicketButton">Hide</a>
            <p className="ticket-content">{content}</p>
            <span className="info">By <span>{userEmail}</span> | {(new Date(creationTime)).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
        </div>
    )
}

export default Ticket;