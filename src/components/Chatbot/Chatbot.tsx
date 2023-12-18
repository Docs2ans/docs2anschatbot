import React, { Children, useContext } from "react";
import { useState } from "react";
import Button from "../Button";
import "./Chatbot.css";
import Input from "../Input";
import Chatlog from "../ChatLog/chatLog";
import { ChatContext } from "../../context/context";

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

    try {
      const res = await fetch("http://localhost:8000/", {
        method: "post",
        body: query,
      }).then((data) => {
        console.log(data.json().then(data=>{
          console.log(data)
        }));
      });
      // const z =res.body

      // if (res.ok) {
      //   console.log(res.body);
      //   setChat((chat) => [
      //     ...chat,
      //     {
      //       type: "answer",
      //       answer: `lorem ipsom Dropdown`,
      //     },
      //   ]);
      // }
      setQueryPer(!queryPer);
    } catch (error) {}

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
