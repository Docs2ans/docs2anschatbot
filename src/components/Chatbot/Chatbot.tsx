import React, { useContext } from "react";
import { useState } from "react";
import Button from "../Button";
import "./Chatbot.css";
import Input from "../Input";
import Chatlog from "../ChatLog/chatLog";
import { ChatContext } from "../../context/context";
// dimport { ChatContext } from "../../context/context";
export interface Chat {
  // user: string;
  answer: string;
}
export default function ChatBot() {
  const [modal, setModal] = useState<boolean>(true);
  const [chat, setChat] = useState<Array<Chat>>([]);
  const [query, setQuery] = useState<string>("");
  const [queryPer, setQueryPer] = useState<boolean>(true);
  // const chat = useContext(ChatContext);
  const queryUpdater = () => {
    console.log("hello");
    setChat((chat) => [...chat, { answer: query }]);
    setQueryPer(!queryPer);
    console.log(queryPer);
    setTimeout(() => {
      setChat((chat) => [
        ...chat,
        {
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit turpis sed neque vulputate, ut rutrum turpis sodales. Fusce dignissim metus massa, ac tempor lectus vehicula vel. Fusce gravida pellentesque nisi, eget sagittis magna pretium gravida. Ut sollicitudin nunc non lectus facilisis sollicitudin. Maecenas aliquet quis felis eget sollicitudin. Phasellus vel eleifend ligula. Quisque bibendum luctus vulputate. Phasellus a blandit lorem. Vestibulum a augue nisl. Aliquam erat volutpat.s",
        },
      ]);
      setQueryPer(!queryPer);
      return 0;
    }, 2000);
    setQuery("");
  };
  return (
    <ChatContext.Provider value={chat}>
      <>
        <Button
          label="open Dailog"
          onClick={(e) => {
            setModal(!modal);
            // console.log(modal);
          }}
        ></Button>
        {/* {modal} */}
        <dialog open={modal}>
          <div className="mainComp">
            <div className="description">
              {chat.length > 0 ? (
                <h2>{chat[0].answer}</h2>
              ) : (
                <h2>Description</h2>
              )}

              <h2
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModal(!modal);
                }}
              >
                X
              </h2>
            </div>
            <div className="chatlogComp">
              {/* <ul style={{ listStyleType: "none" }}>
                {chat &&
                  chat.map((data, index) => {
                    return <li key={index}>{data.answer}</li>;
                  })}
              </ul> */}
              <Chatlog />
            </div>
            <div className="inputComp">
              <Input
                // disabled={queryPer}
                type="text"
                value={query}
                onChange={(e) => {
                  e.preventDefault();
                  console.log("helow");
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    queryUpdater();
                  }
                }}
              />
              {/* <Button label="Submit" /> */}
            </div>
          </div>
        </dialog>
      </>
    </ChatContext.Provider>
  );
}
