require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const ticketsSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      required: false
    },
    creationTime: {
      type: Number,
      required: true
    },
    labels: {
      type: Array,
      required: false

    }
  })
  ticketsSchema.plugin(uniqueValidator);
  ticketsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Tickets = mongoose.model('Tickets', ticketsSchema);
module.exports = Tickets;