"use client";
import React from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

// ==========================================
// 1. SCHEDULE TIMELINE COMPONENT
// ==========================================
export function ScheduleTimeline({event=[]}) {
 

  return (
    <div className="space-y-2.5">
      {event.map((item) => (
        <div key={item.id} className="bg-[#1c1c1e] border border-[#2c2c2e] p-3.5 rounded-xl flex items-center justify-between group hover:border-zinc-700 transition-all">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-zinc-900 border border-[#2c2c2e] rounded-lg text-zinc-400">
              <Clock size={16} />
            </div>
            <div>
              <h4 className="text-xs font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{item.title}</h4>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-500">
                <span>{item.location}</span>
                <span>•</span>
                <span className="bg-[#2c2c2e] px-1.5 py-0.5 rounded text-zinc-400 text-[9px] font-mono">Event</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-zinc-300 block">{new Date(item.event_date).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}</span>
            <span className="text-[10px] text-zinc-500 block">{new Date(item.event_date).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 2. ASSIGNMENT GRID COMPONENT
// ==========================================
export function AssignmentGrid() {
  const tasks = [
    { id: '1', title: 'Compiler Design Lab 3', subject: 'Computer Science', dueDate: 'Tomm, 11:59 PM', status: 'pending', progress: 75 },
    { id: '2', title: 'Probability Problem Set 4', subject: 'Mathematics', dueDate: 'In 3 days', status: 'submitted', progress: 100 },
    { id: '3', title: 'UX Research Case Study', subject: 'Design', dueDate: 'Oct 12', status: 'graded', grade: 'A+', progress: 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl flex flex-col justify-between p-4 space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#2c2c2e] text-zinc-400">{task.subject}</span>
              {task.status === 'graded' || task.status === 'submitted' ? (
                <CheckCircle2 size={14} className={task.status === 'graded' ? 'text-emerald-500' : 'text-blue-400'} />
              ) : (
                <AlertCircle size={14} className="text-amber-500" />
              )}
            </div>
            <h4 className="text-xs font-medium text-zinc-200 mt-2 truncate">{task.title}</h4>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-zinc-500">Progress</span>
              <span className="text-zinc-300 font-mono">{task.progress}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  task.status === 'graded' ? 'bg-emerald-500' : task.status === 'submitted' ? 'bg-blue-500' : 'bg-amber-500'
                }`} 
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-[#2c2c2e]/60 pt-2 text-[10px]">
            <span className="text-zinc-500">Timeline</span>
            <span className="text-zinc-300 font-medium">{task.grade ? `Grade: ${task.grade}` : task.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. STUDY TIME CHART COMPONENT
// ==========================================
export function StudyTimeChart() {
  const chartBars = [
    { day: 'Mon', hrs: 4.5, pct: '55%' },
    { day: 'Tue', hrs: 6.2, pct: '75%' },
    { day: 'Wed', hrs: 8.0, pct: '100%' },
    { day: 'Thu', hrs: 3.5, pct: '40%' },
    { day: 'Fri', hrs: 5.0, pct: '60%' },
    { day: 'Sat', hrs: 2.1, pct: '25%' },
    { day: 'Sun', hrs: 3.1, pct: '35%' },
  ];

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] text-zinc-500 block">Total Focus Time</span>
          <span className="text-lg font-bold text-zinc-100">32.4 Hours</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-medium">↑ 12% vs last week</span>
      </div>

      <div className="h-28 flex items-end justify-between gap-2 pt-2 px-2">
        {chartBars.map((bar, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <div className="w-full bg-zinc-900 rounded-t-md relative h-full flex items-end">
              <div 
                className="w-full bg-zinc-300 group-hover:bg-indigo-400 rounded-t-md transition-all duration-300 cursor-pointer" 
                style={{ height: bar.pct }}
              >
                {/* Micro tooltip element rendered over raw bar hover scopes */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-100 text-black text-[9px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow whitespace-nowrap pointer-events-none">
                  {bar.hrs} hrs
                </div>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">{bar.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}