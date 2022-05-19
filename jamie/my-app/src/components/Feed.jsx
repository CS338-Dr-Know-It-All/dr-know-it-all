import { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import MyMessage from "./MyMessage.jsx";

import { Button } from "react-bootstrap";

const Feed = ({
    prompt,
    setPrompt,
    messages,
    setMessages,
    inProgress,
    setInProgress,
}) => {
    const users = ["donald", "elon", "joe", "shakespeare", "buddha"];
    let index = useRef(0);

    useEffect(() => {
        if (!inProgress || !prompt) {
            return;
        }
        (async () => {
            const res = await fetch("http://127.0.0.1:5000/generate", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                mode: "cors",
                body: JSON.stringify({
                    prompt,
                    person: users[index.current],
                }),
            });
            const data = await res.json();
            const text = data.generated_text;
            const words = text.split(" ");
            const newWord = words[words.length - 1];

            if (text === prompt) {
                stopStory();
                return;
            }

            setPrompt(text);
            setMessages([
                ...messages,
                { person: users[index.current], word: newWord },
            ]);
            index.current = index.current < 4 ? index.current + 1 : 0;
        })();
    }, [prompt, inProgress]);

    const beginStory = async () => {
        setInProgress(true);
    };

    const stopStory = () => {
        setInProgress(false);
    };

    return (
        <div id="body">
            <nav id="header">
                <div className="prompt" style={{ textAlign: "center" }}>
                    {prompt}
                </div>
                <div className="continue-button">
                    <Button
                        onClick={beginStory}
                        variant="outline-secondary"
                        disabled={inProgress}
                        style={{ margin: 5 }}
                    >
                        Generate Story
                    </Button>
                    {inProgress && (
                        <Button
                            onClick={stopStory}
                            variant="primary"
                            style={{ margin: 5 }}
                        >
                            Stop Story
                        </Button>
                    )}
                </div>
            </nav>
            <div id="chat-feed">
                {messages.map(({ person, word }) => (
                     <div className="individual-message-container">
                     {person !== "me" ? (
                         <Message
                             person={person}
                             word={word}
                             className="message"
                         />
                     ) : (
                         <MyMessage
                             person={person}
                             word={word}
                             className="message"
                         />
                     )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
