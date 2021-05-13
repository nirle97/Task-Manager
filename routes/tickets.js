const { Router } = require("express");
const tickets = Router();
const Tickets = require("../mongo");
const path = require("path")
require('dotenv').config()
const bodyParser = require("body-parser")
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

tickets.get("/", (req, res) => {
    try {
        Tickets
        .find()
        .then(tickets => {
            if (req.query.searchText) {
                const filteredTickets = tickets.filter(ticket => {
                    let title = ticket.title.toLowerCase();
                    let searchedText = req.query.searchText.toLowerCase();
                    return title.includes(searchedText)
                })
                return res.status(200).send(filteredTickets)
            }
            return res.status(200).send(tickets)
        })
    } catch(e) {
        console.log(e);
        res.status(404).send({Error: "could not get data from mongodb"});
    }   
  }) 

tickets.patch("/:ticketId/:status", async (req, res) => {
    const status = req.params.status === "done" ? true : req.params.status === "undone" ? false : "invalid"
    if (status === "invalid") return res.status(400).send({Error: "Invalid URL (needs to be done or undone)"})
    try {
        await Tickets.findOneAndUpdate(
            {"_id": req.params.ticketId},
            {"done": status},
            {new: true});
        res.redirect(302, "/")

    } catch(e) {
        console.log(e);
        res.status(500).send({Error: "Invalid ID"});
    }
  })

tickets.post("/add", urlEncodedParser, (req, res) => {
    let labels = req.body.labels.split(' ')
    const ticket = {
        "title": req.body.title,
        "content": req.body.content,
        "userEmail": req.body.userEmail,
        "done": false,
        "creationTime": (new Date).getTime(),
        "labels": labels
    }
    const newTicket = new Tickets(ticket)
      try {
        newTicket.save()
        .then(savedTicket =>  res.status(200).send())
      } catch(e) {
        res.status(500).send("Could not submit the ticket")
      }
    
})

module.exports = tickets;
