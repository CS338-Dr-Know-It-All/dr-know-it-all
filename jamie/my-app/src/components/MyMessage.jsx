import { Card } from "react-bootstrap";

const MyMessage = ({ person, word }) => {
    return (
        <Card
            className="message"
            style={{
                float: "right",
                marginRight: "48px",
                color: "white",
                backgroundColor: "#3B2A50",
            }}
        >
            {person}: {word}
        </Card>
    );
};

export default MyMessage;
