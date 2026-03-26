import Chat from "./Chat";
import "./ChatWindow.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats} = useContext(MyContext);
    const [loading, setLoading] = useState(false);

    const getReply = async () => {
       setLoading(true);
        if (!prompt) {
        alert("Please enter a message");
        return;
        }
        const threadId = currThreadId || Date.now().toString();
        console.log("Prompt:", prompt);
        console.log("ThreadId:", threadId);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: threadId
            })
        };
        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch (err) {
            console.log("Fetch Error:", err);
        }
        setLoading(false);
    }
    //Append new Chat to prevChats
    useEffect(() => {
      if(prompt && reply) {
        setPrevChats(prevChats => {
         return [...prevChats, {
            role: "user",
            content: prompt
          },{
            role: "assistant",
            content: reply
          }]
      })
      }

      setPrompt("");
    }, [reply]);
  return (
    <div className="flex-grow-1 d-flex flex-column bg-black text-white" style={{ backgroundColor: "#212121", color: "#FFFFFF" }}>
      {/* Navbar */}
      <div className="p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#212121", color: "#FFFFFF",borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <span className="fs-5">NeuroChat<i className="fa-solid fa-chevron-down"></i></span>
        <button className="btn btn-outline-light btn-sm d-md-none">☰</button>
      </div>

      
      {/* Chat Area */}
     <div className="flex-grow-1 d-flex flex-column position-relative" style={{ minHeight: 0, backgroundColor: "#212121", color: "#FFFFFF" }}>
  
      {/* Chat Content */}
     <div className="flex-grow-1 overflow-auto p-3" style={{ minHeight: 0 }}>
      <Chat />
     </div>

     {/*Loader (Centered) */}
     {loading && (
     <div className="position-absolute top-50 start-50 translate-middle">
      <ScaleLoader color="#fff" loading={loading} />
     </div>
     )}

    </div>

      {/* Input */}
      <div className="p-3 d-flex flex-column align-items-center" style={{ backgroundColor: "#212121" }}>
  
           <div className="input-group w-100" style={{ maxWidth: "750px", backgroundColor: "#212121" }}>
           <input
             type="text"
              className="form-control bg-dark text-white border-0"
              style={{ backgroundColor: "#2A2A2A", color: "#fff", height: "50px", fontSize: "16px", padding: "12px 20px" }}
              placeholder="Ask Anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter'? getReply():''}
           >
           </input>
            <button className="btn btn-dark" onClick={getReply}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
           </div>

           <p className="text-center mt-2 text-white" style={{ maxWidth: "750px", fontSize: "12px" }}>
            NeuroChat can make mistakes. Check important info. See Cookie Preferences.
           </p>

      </div>

    </div>
  );
}

export default ChatWindow;
