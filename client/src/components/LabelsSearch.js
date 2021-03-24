import '../styles/Ticket.css';
import '../styles/LabelsSearch.css';
import React, {useState, useEffect} from "react";

function LabelsSearch({labels, onClick}) {
    const [validLabels, setValidLabels] = useState([]) 
    useEffect(() => {
        setValidLabels(labels)
    })
    
    return (
        <div className="labels-panel">
            {validLabels.map((label, i) => 
                <span 
                key={`label - ${i}`}  
                onClick={onClick} 
                className="label labels-panel">{label}
                </span>)}
        </div>
    )   
}

export default LabelsSearch;