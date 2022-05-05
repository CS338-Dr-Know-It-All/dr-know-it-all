//import logo from './logo.svg';

import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './App.css';

import Login from './components/Login';

const App = () => {
  if(!localStorage.getItem('username')) return <Login/>;

  return (
    <ChatEngine 
      height='100vh'
      projectID = 'c4d3b966-c2e6-4806-8ede-3039893da1e3'
      userName= {localStorage.getItem('username')} //'Kris'
      userSecret= {localStorage.getItem('password')} //'338'
      renderChatFeed = {(chatAppProps) => <ChatFeed { ... chatAppProps}/> } 
    />
  );
};
export default App;
