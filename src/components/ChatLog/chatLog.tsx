import React, {
  HtmlHTMLAttributes,
  createContext,
  useContext,
  useState,
} from "react";
import { Chat } from "../Chatbot/Chatbot";
import { ChatContext } from "../../context/context";
import "./Chatlog.css";

export interface ButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export default function Chatlog({ ...others }: ButtonProps) {
  const chatLog = useContext(ChatContext);
  const [chat, setChat] = useState<Array<Chat>>(chatLog);
  const [activeId, setactiveId] = useState(Chatlog.length);
  return (
    <>
      <div className="chatLog">
        {chatLog &&
          chatLog.map((data, index) => {
            if (data.type === "query") {
              return (
                <li
                  id={`chatElement${index}`}
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
