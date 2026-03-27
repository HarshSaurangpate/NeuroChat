import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import { useState, useContext } from "react";
import { MyContext } from "./MyContext";

function Sidebar() {
  const {allThreads, setAllThreads, currThreadId} = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(true);
  const getAllThreads = async () => {

    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map(thread =>({threadId: thread.threadId, title: thread.title}));
      console.log(filteredData);
      setAllThreads(filteredData);
      //threadId, title
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  return (
    <div 
      className="text-white p-3 d-none d-md-flex flex-column"
      style={{ 
        width: isOpen ? "260px" : "70px",   // 🔥 collapse width
        backgroundColor: "#171717", 
        height: "100vh",
        transition: "0.3s"                  // smooth animation
      }}
    >

      {/* Top Section (Logo + Toggle) */}
      <div className="d-flex align-items-center justify-content-between mb-3">

        {/* Logo + Title */}
        {isOpen && (
          <div className="d-flex align-items-center gap-2">
            <img src="src/assets/neurochat.png" style={{ height:"28px", width:"28px"}} />
            {/* <h5 className="m-0">NeuroChat</h5> */}
          </div>
        )}

        {/* Toggle Button */}
        <i 
          className="fa-solid fa-bars cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        ></i>

      </div>

      {/* New Chat Button */}
      <div className="d-flex align-items-center gap-2 p-1 rounded mb-1 sidebar-item">
        <i className="fa-solid fa-pen-to-square"></i>
        {isOpen && "New Chat"}
      </div>

      {/* Chat List */}
      <div className="flex-grow-1 overflow-auto">
      
        {allThreads?.map((thread, idx) => (
          <div 
            key={thread.threadId || idx}
            className="d-flex align-items-center gap-2 p-2 rounded mb-1 sidebar-item"
            style={{ cursor: "pointer" }}
          >
            {isOpen && (
              <span className="text-truncate">{thread.title}</span>
            )}
          </div>
        ))}
      
      </div>

      {/* Bottom Section */}
      <div className="mt-auto" style={{borderTop: "1px solid rgba(255,255,255,0.1)"}}>

        <div className="d-flex align-items-center gap-2 p-2 rounded sidebar-item">
          <i className="bi bi-person-circle"></i>
          {isOpen && "Profile"}
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
