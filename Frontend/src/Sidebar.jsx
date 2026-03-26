import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
function Sidebar() {
  return (
    

<div 
  className="text-white p-3 d-none d-md-flex flex-column"
  style={{ width: "260px", backgroundColor: "#171717", height: "100vh" }}
>

  {/* Title */}
  <div className="d-flex align-items-center gap-2 mb-3">
    <img src="src/assets/neurochat.png" style={{ height:"28px", width:"28px"}}></img>
    <h5 className="m-0">NeuroChat</h5>
  </div>

  {/* New Chat Button */}
  <div className="d-flex align-items-center gap-2 p-1 rounded mb-1 sidebar-item">
      <i className="fa-solid fa-pen-to-square"></i>
      New Chat
    </div>

  {/* Chat List */}
  <div className="flex-grow-1 overflow-auto">

    <div className="d-flex align-items-center gap-2 p-1 rounded mb-1 sidebar-item">
      Chat 1
    </div>
    <div className="d-flex align-items-center gap-2 p-1 rounded mb-1 sidebar-item">
      Chat 2
    </div>

  </div>

  {/* Bottom Section */}
  <div className="mt-auto">

    <div className="d-flex align-items-center gap-2 p-2 rounded sidebar-item">
      <i className="bi bi-person-circle"></i>
      Profile
    </div>

  </div>
</div>
  );
}

export default Sidebar;
