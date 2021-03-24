import axios from "axios";
import React, {useState, useEffect} from "react";
import "../styles/App.css";
import Ticket from "./Ticket"
import LabelsSearch from "./LabelsSearch"

function App() {
  const [tickets, setTickets] = useState([])
  const [ticketsToDisplay, setTicketsToDisplay] = useState([])
  const [ticketsToDisplayLength, setTicketsToDisplayLength] = useState(0)
  const [hiddenCounter, setHiddenCounter] = useState(0)
  const [hiddenTicketsArr, setHiddenTicketsArr] = useState([])
  const [validLabels, setValidLabels] = useState([])

  useEffect(() => {
    axios
    .get("/api/tickets")
    .then(tickets => {
      setTickets(tickets.data)
      setTicketsToDisplay(tickets.data)
      setTicketsToDisplayLength(tickets.data.length)
      filterValidLabels(tickets.data)
    })
  }, [])

const filterValidLabels = (tickets) => {
  const TicketsWithValidLabels = tickets.filter(ticket => ticket.labels.length > 0)
  const validLabelsArr = []
  TicketsWithValidLabels.forEach(ticket => {
    ticket.labels.forEach(label => {
      if (!validLabelsArr.includes(label)) validLabelsArr.push(label)
    })
  }) 
  setValidLabels(validLabelsArr)
}
const filterSearch = (e) => {
  const searchedText = e.target.value;
  axios.get(`/api/tickets/?searchText=${searchedText}`)
  .then(filterSearch => {
    setTicketsToDisplay(filterSearch.data)
    setTicketsToDisplayLength(filterSearch.data.length)
  })
}

const hideTicket = (e) => {
  e.target.parentElement.style.display = "none"
  setHiddenCounter(hiddenCounter + 1)
  setHiddenTicketsArr(hiddenTicketsArr.concat([e.target.parentElement]))
  setTicketsToDisplayLength(ticketsToDisplay.length - (hiddenTicketsArr.concat([e.target.parentElement])).length)
}

const restoreTickets = () => {
  hiddenTicketsArr.map(ticket => ticket.style.display = "block")
  setHiddenTicketsArr([])
  setHiddenCounter(0)
  setTicketsToDisplayLength(ticketsToDisplay.length)
}
const filterByLabel = (e) => {
  const labelTarget = e.target.innerText;
  const filterdTickets = tickets.filter(ticket => ticket.labels.includes(labelTarget));
  setTicketsToDisplay(filterdTickets);
  setTicketsToDisplayLength(filterdTickets.length)
}

const showAll = () => {
  setTicketsToDisplay(tickets)
}

  return (
    <div className="App">
      <h1 className="page-title">Task Manager</h1>
      <input id="searchInput" type="text" onChange={filterSearch} placeholder="Filter Results"></input>
      <p className="hideTicketsCounter">
        showing {ticketsToDisplayLength} results ({hiddenCounter} hidden tickets) -
        <a onClick={restoreTickets} id="restoreHideTickets">Restore</a>
      </p>
      <LabelsSearch 
        labels={validLabels}
        filterByLabel={filterByLabel}
        showAll={showAll}
      />
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
          filterByLabel={filterByLabel}
        />
      )}
    </div>
  )
}

export default App;