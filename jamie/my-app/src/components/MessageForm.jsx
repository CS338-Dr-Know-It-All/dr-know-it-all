//import { useState } from "react";
import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const MessageForm = () => {
    return (
        <Container className="message-container">
            <Form className="message-form">
                <Form.Group controlId="formName">
                    <Form.Control type="text" placeholder="Type message here" />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default MessageForm;
