import { Card } from "react-bootstrap";

const MyMessage = ({ person, word }) => {
    return (
        <div className="message-block">
            <Card
                className="message"
                style={{
                    color: "white",
                    backgroundColor: "#3B2A50",
                    float: "right",
                    marginRight: "18px"
                }}
            >
                {word}
            </Card>
        </div>
    );
};

export default MyMessage;
