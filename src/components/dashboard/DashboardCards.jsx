"use client";

import React from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

export function WelcomeCard({user}) {
  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5 flex flex-col justify-between min-h-[160px]">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Academic Hub</span>
<h1 className="text-xl font-semibold tracking-tight text-zinc-100 mt-1">
  Welcome back, {user?.email?.split("@")[0] || "Student"}.
</h1>        <p className="text-xs text-zinc-400 mt-1 max-w-md leading-relaxed">
          You have completed 75% of your weekly milestones. 1 lab assignment requires preparation before Friday.
        </p>
      </div>
      <div className="flex gap-4 border-t border-[#2c2c2e]/60 pt-3 mt-4">
        <div className="text-xs">
          <span className="text-zinc-500 block text-[10px]">Current Semester</span>
          <span className="font-medium text-zinc-300">Fall 2026 (Sem 7)</span>
        </div>
        <div className="text-xs">
          <span className="text-zinc-500 block text-[10px]">Academic Standing</span>
          <span className="font-medium text-emerald-400">First Class Distinction</span>
        </div>
      </div>
    </div>
  );
}

export function GpaCard({ gpa }) {
  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5 h-full">
      <p className="text-xs text-zinc-500">
        Academic Performance
      </p>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <p className="text-xs text-zinc-500">
            CGPA
          </p>

          <h2 className="text-3xl font-bold text-white mt-1">
            {gpa?.cgpa ?? "—"}
          </h2>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            SGPA
          </p>

          <h2 className="text-3xl font-bold text-white mt-1">
            {gpa?.sgpa ?? "—"}
          </h2>
        </div>
      </div>

      <p className="text-xs text-zinc-600 mt-5">
        Updated by faculty
      </p>
    </div>
  );
}
export function AttendanceCard() {
  const subjects = [
    { name: 'Computer Science', value: 92 },
    { name: 'Mathematics', value: 84 },
    { name: 'Engineering Physics', value: 90 }
  ];

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-zinc-300">Overall Attendance</h4>
        <span className="text-xs font-mono font-bold text-emerald-400">88.5%</span>
      </div>
      <div className="space-y-2">
        {subjects.map((sub, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-zinc-400">{sub.name}</span>
              <span className="text-zinc-500 font-mono">{sub.value}%</span>
            </div>
            <div className="w-full bg-[#2c2c2e] h-1 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-400" style={{ width: `${sub.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarWidget() {
  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-zinc-300">July 2026</h4>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-[#2c2c2e] rounded text-zinc-400"><ChevronLeft size={14} /></button>
          <button className="p-1 hover:bg-[#2c2c2e] rounded text-zinc-400"><ChevronRight size={14} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-zinc-500 mb-1">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-400 font-mono">
        {Array.from({ length: 31 }).map((_, i) => {
          const day = i + 1;
          const isToday = day === 3;
          const hasEvent = [3, 12, 19, 24].includes(day);
          return (
            <div 
              key={i} 
              className={`py-1 rounded-md relative flex flex-col items-center justify-center ${
                isToday ? 'bg-zinc-100 text-black font-bold' : 'hover:bg-[#2c2c2e]/60 cursor-pointer'
              }`}
            >
              {day}
              {hasEvent && !isToday && <span className="w-1 h-1 bg-indigo-500 rounded-full absolute bottom-0.5"></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}