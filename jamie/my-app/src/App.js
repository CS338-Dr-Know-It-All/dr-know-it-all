//import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import Feed from "./components/Feed";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [feedDict, setFeedDict] = useState({
        prompt: "Tell me a funny story.",
        messages: [],
    });
    const [placeHolder, setPlaceHolder] = useState("");
    const [inProgress, setInProgress] = useState(false);

    const handleChange = (event) => {
        setPlaceHolder(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFeedDict({
            prompt: placeHolder,
            messages: [
                ...feedDict.messages,
                { person: "me", word: placeHolder },
            ],
        });
        setPlaceHolder("");
    };

    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
    };

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Dr. Know It All!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Rules</h3> Dr. Know-it-all is played by multiple
                    players, sitting beside each other, and who are only allowed
                    to speak one word at a time. So each player will say only
                    one word, in the order Player 1-2-3-1 and so on. Another
                    player will play the interviewer who questions Dr.
                    Know-it-all.
                    <h3 style={{ marginTop: 10 }}>Our Doctor</h3> We have
                    trained multiple natural language processing models on a
                    wide variety of corpora. These models will make up the one
                    word responses of the doctor you are texting with. To ask
                    them a question, just send a text!
                    <h3 style={{ marginTop: 10 }}>
                        Here's a Real World Example
                    </h3>{" "}
                    <iframe
                        title="Example Video"
                        src="https://www.youtube.com/embed/F7hPfq6ZBeA"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen="true"
                    />
                </Modal.Body>
            </Modal>

            <div
                className="chat-title-container"
                style={{ position: "relative" }}
            >
                <Button
                    style={{ position: "absolute", right: 10 }}
                    variant="link"
                    onClick={() => setShow(true)}
                >
                    Instructions
                </Button>
                <h1 className="chat-title">Dr. Know-It-All</h1>
            </div>
            <div
                style={{
                    position: "fixed",
                    top: "8%",
                    width: "100%",
                    height: "39%",
                    overflowY: "auto",
                }}
            >
                {" "}
                <Feed
                    feedDict={feedDict}
                    setFeedDict={setFeedDict}
                    inProgress={inProgress}
                    setInProgress={setInProgress}
                />{" "}
            </div>

            <div className="message-form-container">
                <Container>
                    <Form className="message-form" onSubmit={handleSubmit}>
                        <Form.Control
                            type="text"
                            value={placeHolder}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            placeholder="Type message here"
                            disabled={inProgress}
                        />
                    </Form>
                </Container>
            </div>
        </div>
    );
};
export default App;
