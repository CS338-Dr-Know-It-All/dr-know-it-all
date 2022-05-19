//import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Feed from "./components/Feed";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("Tell me a funny story.");
    const [placeHolder, setPlaceHolder] = useState("");
    const [inProgress, setInProgress] = useState(false);

    const handleChange = (event) => {
        setPlaceHolder(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPrompt(placeHolder);
        setMessages([...messages, { person: "me", word: placeHolder }]);
        setPlaceHolder("");
    };

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <div className="chat-title-container">
                <h1 className="chat-title">Dr Know It All </h1>
            </div>
            <div
                style={{
                    position: "fixed",
                    top: "60px",
                    overflow: "scroll",
                    width: "100%",
                    height: "calc(100% - 200px)",
                }}
            >
                {" "}
                <Feed
                    prompt={prompt}
                    setPrompt={setPrompt}
                    messages={messages}
                    setMessages={setMessages}
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
                            placeholder="Type messsage here"
                            disabled={inProgress}
                        />
                    </Form>
                </Container>
            </div>
        </div>
    );
};
export default App;
