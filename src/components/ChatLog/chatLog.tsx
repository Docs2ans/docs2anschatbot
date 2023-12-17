import { createContext, useContext, useState } from "react";
import { Chat } from "../Chatbot/Chatbot";
import { ChatContext } from "../../context/context";
import "./Chatlog.css";
export default function Chatlog() {
  const chatLog = useContext(ChatContext);
  const [chat, setChat] = useState<Array<Chat>>(chatLog);
  const [activeId, setactiveId] = useState(Chatlog.length);
  //   console.log("hellow");
  return (
    <>
      <div className="chatLog">
        {chatLog &&
          chatLog.map((data, index) => {
            if (data.type === "query") {
              return (
                <li
                  id={`${index}`}
                  style={{
                    listStyleType: "none",
                  }}
                  key={index}
                >
                  {data.answer}
                </li>
              );
            }
            return (
              <li
                style={{
                  listStyleType: "none",
                  backgroundColor: "#d3d3d3",
                  borderRadius: "4px",
                  padding: "16px",
                }}
                key={index}
              >
                {data.answer}
              </li>
            );
          })}
      </div>
    </>
  );
}
