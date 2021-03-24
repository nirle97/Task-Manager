import '../styles/Ticket.css';
import '../styles/LabelsSearch.css';
import React, {useState, useEffect} from "react";

function LabelsSearch({labels, filterByLabel, showAll}) {
    const [validLabels, setValidLabels] = useState([]) 
    useEffect(() => {
        setValidLabels(labels)
    })
    
    return (
        <div className="labels-panel">
            {validLabels.map((label, i) => 
                <span 
                key={`label - ${i}`}  
                onClick={filterByLabel} 
                className="label labels-panel">{label}
                </span>)}
            <span 
                className="label labels-panel show-all"
                onClick={showAll}>
                Show All
            </span>
        </div>
    )   
}

export default LabelsSearch;