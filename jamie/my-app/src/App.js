//import logo from './logo.svg';
import "./App.css";
import { Fragment } from "react";
import Feed from "./components/Feed";

const App = () => {
  return (
    // <ChatEngine
    //   height='100vh'
    //   projectID = 'c4d3b966-c2e6-4806-8ede-3039893da1e3'
    //   userName= {localStorage.getItem('username')} //'Kris'
    //   userSecret= {localStorage.getItem('password')} //'338'
    //   renderChatFeed = {(chatAppProps) => <ChatFeed { ... chatAppProps}/> }
    // />
    <Fragment>
      <div>Dr Know It All</div>
      <Feed />
    </Fragment>
  );
};
export default App;
