const { Router } = require("express");
const tickets = Router();
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const Tickets = require("../mongo");
require('dotenv').config()

tickets.get("/", (req, res) => {
    try {
        Tickets
        .find()
        .then(tickets => {
            const filteredTickets = tickets.filter(ticket => 
                ticket.title.includes(req.query.searchText)
            )
            res.status(200).send(filteredTickets)
        })
    } catch(e) {
        console.log(e);
        res.status(404).send({Error: "could not get data from mongodb"});
    }   
  })

tickets.patch("/:ticketId/:status", async (req, res) => {
    const status = req.params.status === "done" ? true : req.params.status === "undone" ? false : "invalid"
    if (status === "invalid") return res.status(404).send({Error: "Invalid status (needs to be done or undone)"})
    try {
        await Tickets.findOneAndUpdate({"_id": req.params.ticketId}, {"done": status}, {new: true});
        res.status(200).send({updated: true})

    } catch(e) {
        console.log(e);
        res.status(404).send({Error: "Invalid ID"});
    }
  })



module.exports = tickets;
