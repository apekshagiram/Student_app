"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import React, { useState } from 'react';


export default function AcademicLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [showNotifications, setShowNotifications] = useState(false);


  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased flex">
      
      {/* Sidebar Component */}
      <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      {/* Main Framework Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  showNotifications={showNotifications}
  setShowNotifications={setShowNotifications}
/>

        {/* Dashboard Frame Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}