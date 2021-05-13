import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import "../styles/App.css";
import Ticket from "./Ticket"
import LabelsSearch from "./LabelsSearch"
import Spinner from "./Spinner"
import NoResults from "./NoResults"
import ScrollUp from "./ScrollUp"
import AddForm from "./AddForm"

function App() {
  const [tickets, setTickets] = useState([])
  const [ticketsToDisplay, setTicketsToDisplay] = useState([])
  const [ticketsToDisplayLength, setTicketsToDisplayLength] = useState(0)
  const [hiddenCounter, setHiddenCounter] = useState(0)
  const [hiddenTicketsArr, setHiddenTicketsArr] = useState([])
  const [validLabels, setValidLabels] = useState([])
  const [addPost, setAddPost] = useState(false)
  const isPageMounted = useRef(false)
  const noFilterResults = useRef(false)
  useEffect(() => {
    axios
    .get("/api/tickets")
    .then(tickets => {
      isPageMounted.current = true;
      setTickets(tickets.data);
      filterValidLabels(tickets.data);
      setTicketsToDisplay(tickets.data);
      setTicketsToDisplayLength(tickets.data.length);
    })
  }, [])

  const filterValidLabels = (tickets) => {
    const TicketsWithValidLabels = tickets.filter(ticket => {
      if (ticket.labels) return true
      return false
    })
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
    filterSearch.data.length > 0
    ? noFilterResults.current = false
    : noFilterResults.current = true
    setTicketsToDisplay(filterSearch.data)
    setTicketsToDisplayLength(filterSearch.data.length)
    })
  }

  const hideTicket = (e) => {
    const ticketDiv = e.target.parentElement;
    ticketDiv.remove()
    setHiddenCounter(hiddenCounter + 1)
    setHiddenTicketsArr(hiddenTicketsArr.concat([ticketDiv]))
    setTicketsToDisplayLength(ticketsToDisplay.length - (hiddenTicketsArr.concat([ticketDiv])).length)
  }

  const restoreTickets = () => {
    if (!noFilterResults.current) {
      const parentDiv = document.querySelector(".tickets-container")
      hiddenTicketsArr.map(ticket => parentDiv.prepend(ticket))
      setHiddenTicketsArr([])
      setHiddenCounter(0)
      setTicketsToDisplayLength(ticketsToDisplay.length)
    }
  }

  const filterByLabel = (e) => {
    const labelTarget = e.target.innerText;
    const filterdTickets = tickets.filter(ticket => ticket.labels.includes(labelTarget));
    setTicketsToDisplay(filterdTickets);
    setTicketsToDisplayLength(filterdTickets.length)
  }

  const showAll = () => {
    setTicketsToDisplay(tickets)
    setTicketsToDisplayLength(200)
    setHiddenCounter(0)
    const parentDiv = document.querySelector(".tickets-container")
    hiddenTicketsArr.map(ticket => parentDiv.prepend(ticket))  
    setHiddenTicketsArr([])
    noFilterResults.current = false
    const input = document.getElementById("searchInput")
    input.value=""
  }

  return (
    <>
      {!isPageMounted.current ? <Spinner /> : 
        <div className="App">
          <h1 className="page-title">Task Manager</h1>
          {addPost ? <AddForm /> :
            <>
            <input 
              id="searchInput" 
              type="text" 
              onChange={filterSearch} 
              placeholder="Filter Results">
            </input>
            <p className="hideTicketsCounter">
              showing {ticketsToDisplayLength} results (
                <span id="hideTicketsCounter">{hiddenCounter}</span>hidden tickets) -
              <a onClick={restoreTickets} id="restoreHideTickets">Restore</a>
            </p>
            <LabelsSearch 
              labels={validLabels}
              filterByLabel={filterByLabel}
              showAll={showAll}
            />
            <a onClick={()=>setAddPost(!addPost)}><i className="fas fa-plus-circle"></i></a>
            <ScrollUp />
            {noFilterResults.current ? <NoResults /> :
              <div className="tickets-container">
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
            }
          </>
          }
        </div>
      }
    </>
  )
}
export default App;