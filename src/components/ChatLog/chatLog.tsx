import { createContext, useContext, useState } from "react";
import { Chat } from "../Chatbot/Chatbot";
import { ChatContext } from "../../context/context";
import "./Chatlog.css";
export default function Chatlog() {
  const chatLog = useContext(ChatContext);
  const [chat, setChat] = useState<Array<Chat>>(chatLog);
  //   console.log("hellow");
  return (
    <>
      <div className="chatLog">
        {chatLog &&
          chatLog.map((data) => {
            console.log(data);
            return (
              <li style={{ color: "purple", listStyleType: "none" }}>
                {data.answer}
              </li>
            );
          })}
      </div>
    </>
  );
}
