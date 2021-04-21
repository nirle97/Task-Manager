import React, { useState } from "react";
import "../styles/addForm.css"
import { Form, FormGroup, Label, Input } from 'reactstrap';

function AddForm() {

    const [ticketSubmitted, setTicketSubmitted] = useState(false)

    return (
    <div className="form-style-8">
        <h2>Submit Your Ticket Here</h2>
        <Form onSubmit={()=>setTicketSubmitted(true)} method="post" action="/api/tickets/add">
            <FormGroup>
                <Label htmlFor="title">Title:</Label>
                <Input type="text" name="title" required></Input>
                <Label htmlFor="userEmail">E-mail:</Label>
                <Input type="email" name="userEmail" required></Input>
                <Label htmlFor="labels">Labels:</Label>
                <Input type="text" name="labels" required></Input>
                <Label htmlFor="content">Content:</Label>
                <textarea type="text" name="content" rows="5" cols="50" required></textarea>
                <Input type="submit" value="submit"></Input>
            </FormGroup>
        </Form>
        {ticketSubmitted &&
            <p className="greet">Thank You!</p>
        }
    </div>
    )
}

export default AddForm;