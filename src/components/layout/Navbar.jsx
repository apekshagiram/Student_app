"use client"

import React from 'react';
import { Menu, Search, Bell, Plus } from 'lucide-react';

export default function Navbar({ sidebarOpen, setSidebarOpen, showNotifications, setShowNotifications }) {
  const dummyNotifications = [
    { id: 1, text: "Submitted Compiler Design Lab 3 draft", time: "10 mins ago" },
    { id: 2, text: "Marked Present in MATH-302", time: "2 hours ago" },
    { id: 3, text: "Created a new note: Operating Systems", time: "Yesterday" }
  ];

  return (
    <header className="h-14 border-b border-[#1c1c1e] bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      
      {/* Left Area: Toggle Switch & Search Engine */}
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-1.5 rounded-md hover:bg-[#1c1c1e] text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Menu size={18} />
          </button>
        )}
        <div className="relative max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input 
            type="text" 
            placeholder="Search metrics, assignments..." 
            className="w-64 bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-all"
          />
        </div>
      </div>

      {/* Right Area: Notification Dashboard Widget & Quick Actions */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="p-2 rounded-lg bg-[#1c1c1e] border border-[#2c2c2e] hover:bg-[#2c2c2e] text-zinc-300 transition-colors relative"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          </button>

          {/* Activity Center Overlay */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex justify-between items-center border-b border-[#2c2c2e] pb-2">
                <h4 className="text-xs font-semibold text-zinc-200">Activity Timeline</h4>
                <span className="text-[10px] text-zinc-400 hover:underline cursor-pointer">Clear</span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {dummyNotifications.map((n) => (
                  <div key={n.id} className="text-xs flex gap-2.5 p-1.5 rounded hover:bg-[#2c2c2e]/40">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-zinc-300 leading-tight">{n.text}</p>
                      <span className="text-[10px] text-zinc-500">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-black font-medium text-xs px-3 py-1.5 rounded-lg shadow transition-colors">
          <Plus size={14} />
          <span>Quick Actions</span>
        </button>
      </div>

    </header>
  );
}