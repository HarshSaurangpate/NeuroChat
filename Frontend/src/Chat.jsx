import React from "react";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Chat() {
    const {newChat, prevChats} = useContext(MyContext);
  return (
    <>
    <div className="d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "750px" }}>
          <div className="d-flex justify-content-center">
              {newChat && <h1>Start a New Chat!</h1>}
          </div>
        <div className="chats">
           {
           prevChats?.map((chat, idx) =>
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
              <div className="p-3 rounded-3 text-white" style={{ backgroundColor: "#444654", maxWidth: "100%" }}>
                {chat.content}
              </div>
            </div>
          )
         )}
        </div>

       </div>
    </div>
    </>
  );
}

export default Chat;