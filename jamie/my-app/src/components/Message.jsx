import {Card} from 'react-bootstrap';

const Message = (props) => {

    return (
        <div className='message-row'>
            <Card className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: '48px' }} > 
                {props.person} : {props.word}
            </Card>
        </div>
    );
}


export default Message;