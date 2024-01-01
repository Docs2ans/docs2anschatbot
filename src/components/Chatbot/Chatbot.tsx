import React, { Component, HtmlHTMLAttributes, useState } from "react";
import Button from "../Button";
import "./Chatbot.css";
import Input from "../Input";
import Chatlog from "../ChatLog/chatLog";
import { ApiContext, ChatContext } from "../../context/context";
import Interceptor from "../../api/interceptor";

export interface Chat {
  type: string;
  answer: string;
}
export interface Res {
  res: string;
}
interface inputProps extends React.ComponentProps<any> {
  url: string;
}
function ChatBot({ url }: inputProps) {
  const [modal, setModal] = useState<boolean>(true);
  const [chat, setChat] = useState<Array<Chat>>([]);
  const [query, setQuery] = useState<string>("");
  const [queryPer, setQueryPer] = useState<boolean>(false);
  console.log(url);
  const queryUpdater = async () => {
    setChat((chat) => [...chat, { answer: query, type: "query" }]);
    document.getElementById(`chatElement${chat.length}`)?.scrollIntoView(true);
    setQueryPer(true);
    try {
      setQuery("");
      const res = await Interceptor({
        url: url,
        body: query,
        method: "post",
      }).then(async (data) => {
        return data;
      });
      const resAns = JSON.parse(
        await res.json().then((data) => {
          return data;
        })
      );

      if (res.status === 200) {
        setChat((chat) => [
          ...chat,
          {
            type: "answer",
            answer: `${resAns.res}`,
          },
        ]);
        if (document.scrollingElement) {
          const ram = document.getElementById(`chatElement${chat.length}`);
          ram?.scrollIntoView(true);
          console.log();
          document
            .getElementsByClassName("chatLog")[0]
            ?.scroll(
              0,
              document.getElementsByClassName("chatLog")[0].scrollHeight + 10
            );
        }
        setQueryPer(false);
      }
    } catch (error) {
      console.log(error);
      setChat((chat) => chat.splice(chat.length));
      setQueryPer(true);
    }
  };
  return (
    <ApiContext.Provider value={url}>
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
              <div
                className="chatlogComp"
                onScroll={(e) => {
                  console.log(e);
                }}
              >
                <Chatlog />
              </div>
              <div className="inputComp">
                <Input
                  disabled={queryPer}
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
    </ApiContext.Provider>
  );
}

export default ChatBot;
