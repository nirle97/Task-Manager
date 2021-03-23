import axios from "axios";
import React, {useState, useEffect} from "react";
import "../styles/App.css";
import Ticket from "./Ticket"

function App() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    axios
    .get("/api/tickets")
    .then(tickets => {
      setTickets(tickets.data)
    })
  })
  return (
    <div className="App">
    {tickets.map((ticket, i) => {
      return (

          <Ticket 
            key={`ticket - ${i}`}
            title={ticket.title}
            content={ticket.content}
            userEmail={ticket.userEmail}
            done={ticket.done}
            creationTime={ticket.creationTime}
            labels={ticket.labels ? ticket.labels: null}
          />
        )
      }
    )}

    </div>
  );
}

export default App;
