import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


//react-markdown
//rehype-highlight

function Chat() {
    const {newChat, prevChats, reply} = useContext(MyContext);

    const chats = Array.isArray(prevChats) ? prevChats : [];

    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if(reply === null) {
            setLatestReply(null); //prevchat load
            return;
        }
        //latestReply separate => typing effect create
        if(!chats.length) return;

        const content = reply.split(" "); //individual words

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])
  return (
    <>
    <div className="d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "750px" }}>
          <div className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh"}}>
              {newChat && <h1>How can I help you today?</h1>}
          </div>
        <div className="chats">
           {
           chats.slice(0, -1).map((chat, idx) =>
           chat.role === "user" ? (

           // ✅ USER MESSAGE (RIGHT SIDE)
            <div className="d-flex justify-content-end mb-3" key={idx}>
              <div className="p-3 rounded-3 text-white" style={{ backgroundColor: "#2A2A2A", maxWidth: "80%" }}>
                {chat.content}
              </div>
            </div>
          ) : (

           // ✅ BOT MESSAGE (LEFT SIDE)
            <div className="d-flex justify-content-start mb-3" key={idx}>
              <div className="p-3 rounded-3 text-white" style={{ backgroundColor: "#212121", maxWidth: "100%" }}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
              </div>
            </div>
          )
         )}
         {
            chats.length > 0 && (
                <>
                {
                    latestReply === null ? (
                        <div className="gptDiv" key={"non-typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chats[chats.length-1].content}</ReactMarkdown>
                        </div>
                    ): (
                        <div className="gptDiv" key={"typing"}>
                         <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                        </div>
                    )
                }
                </>
            )
         }

        </div>

       </div>
    </div>
    </>
  );
}

export default Chat;