import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from './MyContext';
import { useState } from "react";
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of threads
  const [newChat, setNewChat] = useState(true);
  const [isOpen, setIsOpen] = useState(true);


  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat
  }; // passing values

  return (
    <MyContext.Provider value={providerValues}>
      
    <div className="d-flex vh-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChatWindow isOpen={isOpen} />
    </div>

    </MyContext.Provider>
  )
}

export default App;