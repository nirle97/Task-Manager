import axios from "axios"
import '../styles/Ticket.css';
import React, {useState, useEffect} from "react";
import env from "react-dotenv";

function Ticket({title, content, userEmail, done, creationTime, labels}) {
    const [allLabels, setAllLabels] = useState([labels])
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <p className="ticket-content">{content}</p>
            <span className="info">
                <p className="user-email">By {userEmail} | </p>
                <p className="creation-time">{creationTime}</p>
            </span>
            <span className="label">{allLabels[0].labels}</span>
            {allLabels.length > 0 &&
                labels.map((label, i) => <span key={`label - ${i}`} className="label">{label} </span>)
            }
        </div>
    )
}

export default Ticket;
