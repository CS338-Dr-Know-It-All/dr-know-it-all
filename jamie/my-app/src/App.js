//import logo from './logo.svg';
import "./App.css";
import { useState } from "react"; //Fragment
import { Container, Form } from 'react-bootstrap';
import Feed from "./components/Feed";
//import Message from './components/Message'
//import MessageForm from './components/MessageForm';
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  const [prompt, setPrompt] = useState('Tell me a funny story.');
  const [placeHolder, setPlaceHolder] = useState('');

  const handleChange = (event) => {
    //event.preventDefault();
    setPlaceHolder(event.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Handle Submit runs.');
    console.log('placeHolder value is ', placeHolder );
    setPrompt(placeHolder);
    setPlaceHolder('');
    console.log('prompt value is ', prompt);
  };

  return (
    <div style={{height: '100vh', position:'relative'}}>
      <div className="chat-title-container"><h1 className="chat-title">Dr Know It All </h1></div>

      <div style={{position:'fixed', top:'60px' , overflow:'scroll', width:'100%', height:'calc(100% - 200px)'}}> <Feed prompt={prompt} setPrompt={setPrompt}/> </div>
      
      
      <div className="message-form-container"> 
        <Container>
          <Form className='message-form' onSubmit={handleSubmit}>
              <Form.Control 
                type="text" 
                value={placeHolder}
                onChange={handleChange} 
                onSubmit={handleSubmit}
                placeholder='Type messsage here' />
          </Form>
        </Container>
      </div>
    </div>
  );
};
export default App;
