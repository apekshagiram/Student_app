"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react';
import { 
  LayoutDashboard, BookOpen, CheckSquare, Clock, Calendar, 
  Bell, Users, BarChart3, User, Settings, X, ChevronDown 
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  { name: "Notes", href: "/notes", icon: BookOpen },
  { name: "My Feed", href: "/my-feed", icon: BookOpen },

  { name: "Attendance", href: "/attendance", icon: CheckSquare },
  { name: "Timetable", href: "/timetable", icon: Clock },
  { name: "Assignments", href: "/assignments", icon: CheckSquare },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Events", href: "/events", icon: Bell },
  { name: "Clubs",href:"/clubs", icon:User},
  { name: "Study Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];
  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 border-r border-[#1c1c1e] bg-[#09090b] h-screen sticky top-0 flex flex-col z-50 shrink-0">
      {/* Sidebar Header */}
      <div className="h-14 border-b border-[#1c1c1e] flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-black font-black text-sm">N</div>
          <span className="font-semibold tracking-tight text-sm">Nexus Academic</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-zinc-100">
          <X size={18} />
        </button>
      </div>

      {/* Navigation Options List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                isActive 
                  ? 'bg-[#1c1c1e] text-zinc-100 border border-[#2c2c2e]' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121214]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-zinc-100' : 'text-zinc-400'} />
              {item.name}
            </Link>
          );

        })}
      </nav>

      {/* User Mini Profile Footer */}
      <div className="p-4 border-t border-[#1c1c1e] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
            AM
          </div>
          <div>
            <h4 className="text-xs font-medium text-zinc-200">Alex Mercer</h4>
            <span className="text-[10px] text-zinc-500 block">alex.m@nexus.edu</span>
          </div>
        </div>
        <ChevronDown size={14} className="text-zinc-500" />
      </div>
    </aside>
  );
}