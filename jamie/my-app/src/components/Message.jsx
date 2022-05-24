import { Card } from "react-bootstrap";

const Message = (props) => {

    var headshotDict = {
        'donald' : 'https://www.politico.com/interactives/uploads/image-service/2019/09/trump.png' ,
        'joe' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWBLa7Fu80Vpqts9GQBEwRybgV9G_YfnDvdw&usqp=CAU' ,
        'elon' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFNagohyR6WUNJ0tw7oRFxPDeXztYsQISr5g&usqp=CAU',
        'shakespeare': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3PLHmsdbAlAeERzQCKPsxqfS8tCnCuHsgA&usqp=CAU',
        'buddha': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ClvHKjBY0r97MLA52zZcH6HdgSS112uNww&usqp=CAU' 
    };


    return (
        <div className="message-row">
            <div className="message-avatar">
                <img src= {headshotDict[props.person]} 
                alt='character headshot' 
                width= '36'
                heigh= '36'/>
            </div>

            <div className="message-block">
                <Card className="message"
                    style={{
                        float: "left",
                        backgroundColor: "#CABCDC",
                        marginLeft: "18px"
                    }} >   
                    {props.word}
                </Card>
            </div>
        </div>
    );
};

export default Message;
