const { Router } = require("express");
const tickets = Router();
const mongoose = require("mongoose");
const Tickets = require("../mongo");
require('dotenv').config()

tickets.get("/", (req, res) => {
    Tickets.find().then(tickets => {
        const searchText = req.query.searchText;
        const filteredTickets = tickets.filter(ticket => 
            ticket.title.includes(searchText)
        )
        res.send(filteredTickets)
    })
  })

module.exports = tickets;
