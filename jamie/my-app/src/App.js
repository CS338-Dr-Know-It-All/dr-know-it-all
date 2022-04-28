//import logo from './logo.svg';

import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './App.css';

const App = () => {
  return (
    <ChatEngine 
      height='100vh'
      projectID = 'c4d3b966-c2e6-4806-8ede-3039893da1e3'
      userName='Kris'
      userSecret='338'
      renderChatFeed = {(chatAppProps) => <ChatFeed { ... chatAppProps}/> } 
    />
  )
}



//auto generated code
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;
