import { useEffect, useState } from "react";

const Feed = (props) => {
  const users = ["donald", "elon", "joe", "ts", "buddha"];
  const [prompt, setPrompt] = useState("Tell me a funny story.");
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);

  const changeIndex = () => {
    const newIndex = index < 4 ? index + 1 : 0;
    setIndex(newIndex);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          prompt,
          person: users[index],
        }),
      });
      const data = await res.json();
      setPrompt(data.generated_text);
    })();
  }, []);

  return (
    <div>
      {prompt}
      {/* {messages.map((message) => (
        <Message message={message} />
      ))} */}
    </div>
  );
};

export default Feed;
