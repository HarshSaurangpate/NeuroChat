import Chat from "./Chat";
import "./ChatWindow.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { ScaleLoader } from "react-spinners";
import Navbar from "./components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function ChatWindow({ isOpen, setIsOpen }) {

  const {
    prompt, setPrompt,
    reply, setReply,
    currThreadId,
    prevChats, setPrevChats,
    setNewChat
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    if (!prompt) {
      alert("Please enter a message");
      return;
    }

    setLoading(true);
    setNewChat(false);

    const threadId = currThreadId || Date.now().toString();

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: prompt,
          threadId
        })
      });

      const res = await response.json();
      setReply(res.reply);

    } catch (err) {
      console.log("Fetch Error:", err);
    }

    setLoading(false);
  };

  // Append chats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prev => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: reply }
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#212121",
      color: "#fff",
      overflow: "hidden" // 🔥 Prevent full page scroll
    }}
  >

    {/* ================= NAVBAR ================= */}
    <Navbar setIsOpen={setIsOpen} />

    {/* ================= CHAT AREA ================= */}
    <div
      style={{
        flex: 1,
        minHeight: 0, // 🔥 Important for flex scroll fix
        overflowY: "auto",
        overflowX: "hidden",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
      }}
    >

      {/* Chat Container (fixed width like ChatGPT) */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px"
        }}
      >
        <Chat />
      </div>

      {/* ================= LOADER ================= */}
      {loading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <ScaleLoader color="#fff" />
        </div>
      )}

    </div>

    {/* ================= INPUT SECTION ================= */}
    <div
      style={{
        padding: "16px",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >

      {/* Input Wrapper (center aligned) */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >

        {/* Input + Button */}
        <div className="input-group">

          {/* Text Input */}
          <input
            type="text"
            className="form-control border-0"
            style={{
              backgroundColor: "#2f2f2f",
              color: "#fff",
              height: "50px"
            }}
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          />

          {/* Send Button */}
          <button
            className="btn border-0"
            style={{
              backgroundColor: "#2f2f2f",
              color: "#fff"
            }}
            onClick={getReply}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>

        </div>

        {/* Footer Note */}
        <p className="text-center mt-2" style={{ fontSize: "12px" }}>
          NeuroChat can make mistakes. Check important info.
        </p>

      </div>

    </div>

  </div>
);
}

export default ChatWindow;