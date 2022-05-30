//import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
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

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <div className="chat-title-container">
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
