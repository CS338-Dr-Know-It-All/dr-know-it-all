import React, { useState, useEffect, useRef } from "react";
import CharacterList from "./CharacterList";
import Message from "./Message";
import MyMessage from "./MyMessage";

import { Button } from "react-bootstrap";

const Feed = ({ feedDict, setFeedDict, inProgress, setInProgress }) => {
    const { prompt, messages } = feedDict;
    const [characters, setCharacters] = useState([
        "donald",
        "elon",
        "joe",
        "shakespeare",
        "buddha",
    ]);
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
                    person: characters[index.current],
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

            setFeedDict({
                prompt: text,
                messages: [
                    ...messages,
                    { person: characters[index.current], word: newWord },
                ],
            });
            index.current = index.current < 4 ? index.current + 1 : 0;
        })();
    }, [prompt, inProgress]);

    const beginStory = async () => {
        index.current = 0; // reset to beginning
        setInProgress(true);
    };

    const stopStory = () => {
        setInProgress(false);
    };

    return (
        <div id="body">
            <nav id="header">
                <CharacterList
                    characters={characters}
                    setCharacters={setCharacters}
                    inProgress={inProgress}
                />
                <div
                    style={{
                        marginTop: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Prompt:
                </div>
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
                {messages.map(({ person, word }, index) => (
                    <div className="individual-message-container" key={index}>
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
