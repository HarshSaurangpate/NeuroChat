import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import { useState, useContext } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";
const API_URL = import.meta.env.VITE_API_URL;

function Sidebar({ isOpen, setIsOpen }) {
  const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);
  const getAllThreads = async () => {

    try {
      const response = await fetch(`${API_URL}/api/thread`);
      const res = await response.json();
      const filteredData = res.map(thread =>({threadId: thread.threadId, title: thread.title}));
      //console.log(filteredData);
      setAllThreads(filteredData);
      //threadId, title
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(`${API_URL}/api/thread/${newThreadId}`);
      const res = await response.json();
      console.log(res);
      setPrevChats(Array.isArray(res) ? res : res.messages || []);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  }

  const deleteThread = async (threadId) => {
    if (!threadId || threadId === "Delete") {
    console.log("Invalid threadId:", threadId);
    return;
  }
    try {
      const response = await fetch(`${API_URL}/api/thread/${threadId}`, {method: "DELETE"});
      const res = await response.json();
      console.log(res);
      //Updaqted threads re-render 
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))
      
      if(threadId === currThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(err);
    }
  }

  return (
  <>
    {/* 🔥 Overlay (Mobile Only) */}
    {isOpen && (
      <div
        className="d-md-none"
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 998
        }}
      ></div>
    )}

    {/* 🔥 Sidebar */}
    <div 
      className="text-white p-3 d-flex flex-column"
      style={{ 
        width: isOpen ? "260px" : "70px",
        backgroundColor: "#171717", 
        height: "100vh",
        transition: "0.3s",

        position: "fixed",
        top: 0,
        left: window.innerWidth >= 768 
          ? "0" 
          : (isOpen ? "0" : "-260px"),
        zIndex: 999
      }}
    >

      {/* Top Section */}
      <div className="d-flex align-items-center justify-content-between mb-3">

        {isOpen && (
          <div className="d-flex align-items-center gap-2">
            <img src="src/assets/neurochat.png" style={{ height:"28px", width:"28px"}} />
          </div>
        )}

        <i 
          className="fa-solid fa-bars"
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        ></i>

      </div>

      {/* New Chat */}
      <div 
        className="d-flex align-items-center gap-2 p-2 rounded mb-1 sidebar-item"
        style={{ cursor: "pointer" }}
        onClick={createNewChat}
      >
        <i className="fa-solid fa-pen-to-square"></i>
        {isOpen && "New Chat"}
      </div>

      {/* Chat List */}
      <div className="flex-grow-1 overflow-auto">
     {allThreads?.map((thread, idx) => (
    <div 
      key={thread.threadId || idx}
      className="d-flex align-items-center justify-content-between p-2 rounded mb-1 sidebar-item position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => changeThread(thread.threadId)}
    > 
      {/* LEFT SIDE (Title) */}
      {isOpen && (
        <span className="text-truncate">{thread.title}</span>
      )}

      {/* RIGHT SIDE (Delete Icon) */}
      <i 
        className="fa-solid fa-trash delete-icon"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Deleting ID:", thread.threadId); // 🔥 VERY IMPORTANT (prevent chat click)
          deleteThread(thread.threadId);
        }}
      ></i>
    </div>
  ))}
</div>

      {/* Bottom Section */}
      <div 
        className="mt-auto" 
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="d-flex align-items-center gap-2 p-2 rounded sidebar-item">
          <i className="bi bi-person-circle"></i>
          {isOpen && "Profile"}
        </div>
      </div>

    </div>
  </>
);
}

export default Sidebar;
