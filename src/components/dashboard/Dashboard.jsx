"use client";
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WelcomeCard, GpaCard, AttendanceCard, CalendarWidget } from './DashboardCards';
import { ScheduleTimeline} from './WorkspaceTrackers';
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getRecentNotes,
  getUpcomingEvents,
  getDashboardStats,
  getSuggestedClubs,
  getStudyAnalytics,
  getDashboardAssignments,
} from "@/lib/actions/dashboard";
import QuickStats from "./QuickStats";
import { getGPA } from "@/lib/actions/gpa";

// Dummy Notes array specifically kept local to this dashboard page context
const MOCK_NOTES_PREVIEW = [
  { id: '1', title: 'Advanced Data Structures', excerpt: 'Deep dive into AVL trees, B-Trees, and amortized complexity analysis.', subject: 'Computer Science', updatedAt: '2 mins ago', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { id: '2', title: 'Linear Algebra Matrix Spaces', excerpt: 'Null space, column space, and rank-nullity theorem proofs.', subject: 'Mathematics', updatedAt: '2 hours ago', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: '3', title: 'Operating Systems - Semaphores', excerpt: 'Solving the Producer-Consumer problem using mutexes.', subject: 'Engineering', updatedAt: 'Yesterday', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
];


export default function Dashboard() {
  const [user, setUser] = useState(null);

    const [recentNotes, setRecentNotes] = useState([]);

    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const [stats, setStats] = useState({
  notesCount: 0,
  eventsCount: 0,
  clubsJoined: 0,
});

const [suggestedClubs, setSuggestedClubs] = useState([]);
const [gpa, setGpa] = useState(null);
const [studyAnalytics, setStudyAnalytics] = useState({
  totalMinutes: 0,
  totalSessions: 0,
});

const [assignments, setAssignments] = useState([]);

useEffect(() => {
  async function loadDashboard() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    const [
      notes,
      events,
      dashboardStats,
      clubs,
      studyData,
        gpaData,
    ] = await Promise.all([
      getRecentNotes(),
      getUpcomingEvents(),
      getDashboardStats(),
      getSuggestedClubs(),
      getStudyAnalytics(),
      getDashboardAssignments(),
       getGPA(),
    ]);

    setRecentNotes(notes);
    setUpcomingEvents(events);
    setStats(dashboardStats);
    setSuggestedClubs(clubs);
    setStudyAnalytics(studyData);
    setAssignments(assignments);
    setGpa(gpaData);

    
  }

  loadDashboard();
}, []);


  
  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner Block & GPA Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <div className="lg:col-span-2">
          <WelcomeCard user={user} />
        </div>
        <div>
          <GpaCard gpa={gpa} />

        </div>
      </div>

<QuickStats stats={stats} />
      {/* Main Structural Framework Mesh */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Schedule, Tracking, and Analytics */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Today's Schedule Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Today's Class Schedule</h3>
              <span className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer flex items-center gap-1 transition-colors">
                <Link href="/events">View All Events</Link> <ChevronRight size={12} />
              </span>
            </div>
            <ScheduleTimeline events={upcomingEvents} />
          </div>

          {/* Assignments Progress Array */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Assignment Tracker</h3>
              <span className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer flex items-center gap-1 transition-colors">
                View All Tasks <ChevronRight size={12} />
              </span>
            </div>
            <div className="space-y-3">
  {assignments.length === 0 ? (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5 text-sm text-zinc-500">
      No assignments available.
    </div>
  ) : (
    assignments.map((assignment) => (
      <div
        key={assignment.id}
        className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">
              {assignment.title}
            </h4>

            <p className="text-xs text-zinc-500 mt-1">
              {assignment.subject}
            </p>
          </div>

          <span className="text-xs text-zinc-400 whitespace-nowrap">
            {assignment.status}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-zinc-500">
            Due: {assignment.due_date}
          </span>

          <span className="text-xs text-zinc-400">
            {assignment.priority}
          </span>
        </div>
      </div>
    ))
  )}
</div>
          </div>

          {/* Weekly Time Allocation Charts */}
          {/* Study Analytics */}
<div>
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
      Study Analytics
    </h3>

    <Link
      href="/analytics"
      className="text-xs text-zinc-500 hover:text-zinc-300"
    >
      View Analytics
    </Link>
  </div>

  <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs text-zinc-500">
          Total Study Time
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {(studyAnalytics.totalMinutes / 60).toFixed(1)} hrs
        </h2>
      </div>

      <div>
        <p className="text-xs text-zinc-500">
          Study Sessions
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {studyAnalytics.totalSessions}
        </h2>
      </div>
    </div>
  </div>
</div>

        </div>

        {/* Right Column: Calendar, Attendance, and Quick Workspace Notes */}
        <div className="space-y-6">
          
          {/* Calendar Block Widget */}
          <CalendarWidget />

          {/* Overall Attendance Statistics */}
          <AttendanceCard />

          <div>
  {/* Recent Notes */}
  <div className="flex items-center justify-between mb-2.5">
    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
      Recent Notes
    </h4>

    <span className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer flex items-center gap-1 transition-colors">
     <Link href="/notes">All Notes</Link> <ChevronRight size={12} />
    </span>
  </div>

  <div className="space-y-2">
    {recentNotes.map((note) => (
      <div
        key={note.id}
        className="p-3 bg-[#1c1c1e] border border-[#2c2c2e] hover:border-zinc-700 transition-colors rounded-xl space-y-1.5 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] px-1.5 py-0.5 rounded border bg-blue-500/10 text-blue-500 border-blue-500/20">
            Academic
          </span>

          <span className="text-[10px] text-zinc-500 font-mono">
            {new Date(note.created_at).toLocaleDateString()}
          </span>
        </div>

        <h4 className="text-xs font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors truncate">
          {note.author}
        </h4>

        <p className="text-[11px] text-zinc-400 line-clamp-1">
          {note.text}
        </p>
      </div>
    ))}
  </div>

  {/* Suggested Clubs */}
  <div className="mt-6">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Suggested Clubs
      </h4>

      <span className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer">
        <Link href="/clubs">View All</Link>
      </span>
    </div>

    <div className="space-y-2">
      {suggestedClubs.length === 0 ? (
        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4 text-sm text-zinc-500">
          🎉 You have joined all available clubs.
        </div>
      ) : (
        suggestedClubs.map((club) => (
          <div
            key={club.id}
            className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-4"
          >
            <h4 className="text-sm font-semibold text-white">
              {club.name}
            </h4>

            <p className="text-xs text-zinc-400 mt-1">
              {club.category}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
</div>

        </div>

      </div>
    </div>
  );
}