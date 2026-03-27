import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import { useState } from "react";

function Sidebar() {

  const [isOpen, setIsOpen] = useState(true);

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

        <div className="d-flex align-items-center gap-2 p-1 rounded mb-1 sidebar-item">
          {isOpen && "Chat 1"}
        </div>

        <div className="d-flex align-items-center gap-2 p-1 rounded mb-1 sidebar-item">
          {isOpen && "Chat 2"}
        </div>

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
