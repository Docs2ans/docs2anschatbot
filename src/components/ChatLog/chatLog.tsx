import React, { HtmlHTMLAttributes, useContext } from "react";
import { Chat } from "../Chatbot/Chatbot";
import { ChatContext } from "../../context/context";
import "./Chatlog.css";
import Typewriter from "react-ts-typewriter";

export default function Chatlog({
  ...others
}: HtmlHTMLAttributes<HTMLDivElement>) {
  const chatLog = useContext<Array<Chat>>(ChatContext);
  return (
    <>
      <div
        className="chatLog"
        onScroll={(e) => {
          console.log(e);
        }}
        onScrollCapture={(e) => {
          console.log(e);
        }}
      >
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
                  <Typewriter text={data.answer} speed={80} cursor={false} />
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
                id={`chatElement${index}`}
              >
                <Typewriter text={data.answer} speed={8} cursor={false} />
              </li>
            );
          })}
      </div>
    </>
  );
}
