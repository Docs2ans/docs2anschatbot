import { createContext } from "react";
import { Chat } from "../components/Chatbot/Chatbot";

export const ChatContext = createContext<Array<Chat>>([]);

export const ApiContext = createContext<string>("");
