import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import "../styles/App.css";
import Ticket from "./Ticket"

function App() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    axios
    .get("/api/tickets")
    .then(tickets => setTickets(tickets.data))
  })
  return (
    <div className="App">
    {tickets.map(ticket => {
      let ticketLabels = ticket.label ? ticket.label : null
      return (
          <Ticket 
          title={ticket.title}
          content={ticket.content}
          userEmail={ticket.userEmail}
          done={ticket.done}
          creationTime={ticket.creationTime}
          labels={ticketLabels}
          />
        )
      }
    )}

    </div>
  );
}

export default App;
