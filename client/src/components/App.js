import axios from "axios";
import React, {useState, useEffect} from "react";
import "../styles/App.css";
import Ticket from "./Ticket"

function App() {
  const [tickets, setTickets] = useState([])
  const [ticketsToDisplay, setTicketsToDisplay] = useState([])

  useEffect(() => {
    console.log("useEffect");
    axios
    .get("/api/tickets")
    .then(tickets => {
      setTickets(tickets.data)
      setTicketsToDisplay(tickets.data)
    })
  }, [])

const filterSearch = (e) => {
  const searchedText = e.target.value;
  const filterdTickets = tickets.filter(ticket => 
    ticket.title.includes(searchedText))
  setTicketsToDisplay(filterdTickets)
}

  return (
    <div className="App">
    <input id="searchInput" type="text" onChange={filterSearch}></input>
      {ticketsToDisplay.map((ticket, i) => 
        <Ticket 
          key={`ticket - ${i}`}
          title={ticket.title}
          content={ticket.content}
          userEmail={ticket.userEmail}
          done={ticket.done}
          creationTime={ticket.creationTime}
          labels={ticket.labels}
        />
      )}
    </div>
  )
}

export default App;