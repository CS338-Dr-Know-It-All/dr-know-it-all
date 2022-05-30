import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

const MyMessage = ({ audioEnabled, speak, word, voice }) => {
    useEffect(() => {
        if (audioEnabled && word) {
            speak({ text: word, voice });
        }
    }, [word]);

    return (
        <div className="message-block">
            <Card
                className="message"
                style={{
                    color: "white",
                    backgroundColor: "#3B2A50",
                    float: "right",
                    marginRight: "18px",
                }}
            >
                {word}
            </Card>
        </div>
    );
};

export default MyMessage;
