import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { updateCorrect, updateIncorrect } from "../convex/messages";

// For demo purposes. In a real app, you'd have real user data.
const NAME = faker.person.firstName();

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  height: number;
  width: number;
  text: string;
}

export function Button({ height, width, text, ...props }: ButtonProps) {
  return (
    <button type="submit" style={{ height: `${height}rem`, width: `${width}rem`, margin: '0 0.5rem',  // Add some horizontal margin
  }} {...props}>
      {text}
    </button>
  );
}

export default function App() {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const updateCorrect = useMutation(api.messages.updateCorrect); 
  const updateIncorrect = useMutation(api.messages.updateIncorrect); 

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  // 3 stages: skip/reveal, right/wrong, next
  const [stage, setStage] = useState("skip_reveal");

  return (
    <main className="chat">
      <header>
        <h1>Math Helper</h1>
      </header>
      {messages?.map((message) => (
        <article
          key={message._id}
          className={message.author === NAME ? "message-mine" : ""}
        >
          <div>{message.author}</div>
          <p>{message.body}</p>
        </article>
      ))}
      <div className="input-area button_row">
        <div className="button-group">
          <Button
            height={3}
            width={10}
            text="Correct"
            onClick={() => updateCorrect()} // Wrap in an anonymous function
          />
          <Button
            height={3}
            width={10}
            text="Incorrect"
            onClick={() => updateIncorrect()} // Wrap in an anonymous function
          />
        </div>
      </div>
    </main>
  );
}
