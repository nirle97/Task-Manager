import '../styles/Ticket.css';
import React from "react";

function Ticket({title, content, userEmail, creationTime, labels, hideTicket, filterByLabel}) {
    const labelColor = ["green", "red", "orange", "purple", "blue", "pink"]
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <span className="all-ticket-lables">
                {labels &&
                labels.map((label, i) => 
                    <span className="label"
                        style = {{"backgroundColor": labelColor[i]}}
                        onClick={filterByLabel} 
                        key={`label - ${i}`}>
                        {label} 
                    </span>)}
            </span>
            <a onClick={hideTicket} className="hideTicketButton">Hide</a>
            <p className="ticket-content">{content}</p>
            <span className="info">By &nbsp; 
                <span>{userEmail}</span> | &nbsp; 
                {(new Date(creationTime)).toLocaleString('en-GB', { timeZone: 'UTC' })}
            </span>
        </div>
    )
}

export default Ticket;