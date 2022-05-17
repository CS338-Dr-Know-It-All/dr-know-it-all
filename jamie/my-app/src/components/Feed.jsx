import { useState } from "react";
import Message from './Message.jsx';

import { Button } from 'react-bootstrap';

const Feed = ({prompt, setPrompt}) => {
  const users = ["donald", "elon", "joe", "shakespeare", "buddha"];
  //const [prompt, setPrompt] = useState("Tell me a funny story.");
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  //my adds


  const changeIndex = () => {
    const newIndex = index < 4 ? index + 1 : 0;
    setIndex(newIndex);
  };

  const addWord = async () => {
    const res = await fetch("http://127.0.0.1:5000/generate", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        prompt,
        person: users[index],
      }),
    });

    const data = await res.json();
    const text = data.generated_text;
    const words = text.split(" ");
    const newWord = words[words.length - 1];

    setPrompt(text);
    messages.push({ person: users[index], word: newWord });
    setMessages(messages);
    changeIndex();
  };

  return (
    <div>
      <div>
        <div className="prompt">{prompt}</div>
        <div className="continue-button">
          <Button onClick={addWord} variant='outline-secondary'>Continue Story</Button>
        </div>
      </div>
      <div>
        <div className="chat-feed">
          {messages.map(({ person, word }) => (
          <div className='individual-message-container'> 
            <Message person = {person} word={word} className='message'></Message> 
          </div>
          /*<div>
            //{person}: {word}
          </div> */
        ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
