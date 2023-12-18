import React, { Children, useContext } from "react";
import { useState } from "react";
import Button from "../Button";
import "./Chatbot.css";
import Input from "../Input";
import Chatlog from "../ChatLog/chatLog";
import { ChatContext } from "../../context/context";
import Interceptor from "../../api/interceptor";

// dimport { ChatContext } from "../../context/context";
enum TypeMessage {
  "question",
  "answer",
}
export interface Chat {
  type: string;
  answer: string;
}
export default function ChatBot() {
  const [modal, setModal] = useState<boolean>(true);
  const [chat, setChat] = useState<Array<Chat>>([]);
  const [query, setQuery] = useState<string>("");
  const [queryPer, setQueryPer] = useState<boolean>(true);

  // const chat = useContext(ChatContext);
  const queryUpdater = async () => {
    setChat((chat) => [...chat, { answer: query, type: "query" }]);
    setQueryPer(!queryPer);
    const res = await Interceptor(query);
    setTimeout(() => {
      setChat((chat) => [
        ...chat,
        {
          type: "answer",
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
        <dialog open={modal}>
          <div className="mainComp">
            <div
              className="description"
              onScroll={(e) => {
                console.log(e);
                scroll(100, 0);
              }}
            >
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
            <div
              className="chatlogComp"
              onScroll={(e) => {
                console.log(e);
              }}
            >
              <Chatlog
                onClick={(e) => {
                  console.log("helolow");
                  scroll(100, 0);
                }}
              />
            </div>
            <div className="inputComp">
              <Input
                // disabled={queryPer}
                type="text"
                value={query}
                onChange={(e) => {
                  e.preventDefault();
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    queryUpdater();
                  }
                }}
              />
            </div>
          </div>
        </dialog>
      </>
    </ChatContext.Provider>
  );
}
