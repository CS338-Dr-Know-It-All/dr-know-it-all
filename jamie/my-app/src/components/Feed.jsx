import { useState } from "react";

const Feed = () => {
  const users = ["donald", "elon", "joe", "ts", "buddha"];
  const [prompt, setPrompt] = useState("Tell me a funny story.");
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);

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
      <div>{prompt}</div>
      <button onClick={addWord}>Continue Story</button>
      {messages.map(({ person, word }) => (
        <div>
          {person}: {word}
        </div>
      ))}
    </div>
  );
};

export default Feed;
