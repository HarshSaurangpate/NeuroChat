import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from './MyContext';
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { Routes, Route } from "react-router-dom";

function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, setAllThreads
  };
  const isMobile = window.innerWidth < 768;

  return (
  <MyContext.Provider value={providerValues}>

    <div style={{ display: "flex" }}>

      {/* ================= SIDEBAR ================= */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",   // 🔥 CENTER EVERYTHING
          transition: "all 0.3s ease"
        }}
      >

        {/* ================= INNER CONTENT ================= */}
        <div
          style={{
          marginLeft: isMobile 
            ? "0" 
            : (isOpen ? "260px" : "70px"), // ✅ SHIFT CONTENT

          width: "100%",
          height: "100vh",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column"
        }}
        >

          {/* Routes */}
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<ChatWindow setIsOpen={setIsOpen} />} />
              <Route path="/login" element={<Login setIsOpen={setIsOpen} />} />
              <Route path="/signup" element={<Signup setIsOpen={setIsOpen} />} />
            </Routes>
          </div>

        </div>

      </div>

    </div>

  </MyContext.Provider>
);
}

export default App;