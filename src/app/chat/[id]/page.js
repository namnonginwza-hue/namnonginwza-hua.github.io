"use client"
import React from 'react'
import { useParams,useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from "react";
import { sendMessage } from '@/lib/api';

function chatpage() {
  const scrollRef = useRef(null);
  const { id: roomId } = useParams(); // ดึง roomId จาก URL
  const roomIdInt = parseInt(roomId, 10);
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  

 

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const msg = await sendMessage(roomIdInt, input.trim());
      setMessages((prev) => [...prev, msg]);
     
      console.log("Message sent:", msg);
    }catch(error){
      console.error("Error sending message:", error);
    }
  }

  return (
    // <div>
    //   room id is = {roomIdInt}
    
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200 rounded-t-2xl">
          <button
            onClick={() => router.push("/home")}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
          >
            ← Home
          </button>
          <div className="font-bold text-blue-600 text-lg text-center flex-1">
            Chat Room {roomId}
          </div>
          <div className="w-16" /> {/* ช่องว่างให้กึ่งกลาง */}
        </div>
        {/* Messages */}
        {/* <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
          {messages.map((msg) => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div
                key={msg.id}
                className={`p-2 rounded-xl max-w-[70%] shadow-sm break-words ${
                  isMe
                    ? "bg-blue-500 text-white self-end"
                    : "bg-blue-100 text-blue-800 self-start"
                }`}
              >
                {msg.content}
              </div>
            );
          })}
        </div> */}

        {/* Input */}
        <div className="p-4 border-t border-blue-200 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default chatpage