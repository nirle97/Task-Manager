import axios from "axios";
import React, {useState, useEffect} from "react";
import "../styles/App.css";
import Ticket from "./Ticket"

function App() {
  const [tickets, setTickets] = useState([])
  const [ticketsToDisplay, setTicketsToDisplay] = useState([])
  const [hiddenCounter, setHiddenCounter] = useState(0)
  const [hiddenTicketsArr, setHiddenTicketsArr] = useState([])

  useEffect(() => {
    axios
    .get("/api/tickets")
    .then(tickets => {
      setTickets(tickets.data)
      setTicketsToDisplay(tickets.data)
    })
  }, [])

const filterSearch = (e) => {
  const searchedText = e.target.value;
  axios.get(`/api/tickets/?searchText=${searchedText}`)
  .then(filterSearch => setTicketsToDisplay(filterSearch.data))
}
// const filterSearch = (e) => {
//   const searchedText = e.target.value;
//   const filterdTickets = tickets.filter(ticket => 
//     ticket.title.includes(searchedText))
//   setTicketsToDisplay(filterdTickets)
// }

const hideTicket = (e) => {
  e.target.parentElement.hidden = true
  setHiddenCounter(hiddenCounter + 1)
  setHiddenTicketsArr(hiddenTicketsArr.concat([e.target.parentElement]))
}

const restoreTickets = () => {
  hiddenTicketsArr.map(ticket => ticket.hidden = false)
  setHiddenTicketsArr([])
  setHiddenCounter(0)
}

  return (
    <div className="App">
    <input id="searchInput" type="text" onChange={filterSearch}></input>
    <p className="hideTicketsCounter">{hiddenCounter} hidden tickets</p>
    <button onClick={restoreTickets} id="restoreHideTickets">Restore Hidden Tickets</button>
      {ticketsToDisplay.map((ticket, i) => 
        <Ticket 
          key={`ticket - ${i}`}
          title={ticket.title}
          content={ticket.content}
          userEmail={ticket.userEmail}
          done={ticket.done}
          creationTime={ticket.creationTime}
          labels={ticket.labels}
          hideTicket={hideTicket}
        />
      )}
    </div>
  )
}

export default App;