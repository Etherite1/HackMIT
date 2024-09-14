import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

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

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  // 4 stages: user_input, skip/reveal, right/wrong, next
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
      {stage == "user_input" && 
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await sendMessage({ body: newMessageText, author: NAME });
            setNewMessageText("");
            setStage("skip_reveal");
          }}
        >
          <input
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Write a query..."
            style={{ width: '100%'}}
          />
        </form>
      }
      {stage == "skip_reveal" &&
        <div className="button-group">
          <Button
            height={3}
            width={10}
            text="New Query"
            onClick={() => {
              setStage("user_input");
            }}
          />
          <Button
            height={3}
            width={10}
            text="Similar Problem"
            onClick={() => {

            }}
          />
          <Button
            height={3}
            width={10}
            text="Reveal Answer"
            onClick={() => {
              
            }}
          />
        </div>
}
    </main>
  );
}
