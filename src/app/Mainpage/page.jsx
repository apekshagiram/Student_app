"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import SidebarItem from "../component/SidebarItem";
import EventItem from "../component/EventItem";
import GroupItem from "../component/GroupItem";
import { useRouter } from "next/navigation";

export default function Home() {
  // Router object used for page navigation (e.g. go to /ai)
  const router = useRouter();

  // Supabase client for database and auth operations
  const supabase = createBrowserSupabaseClient();

  // Stores all notes fetched from database
  const [notes, setNotes] = useState([]);

  // Stores text while adding a new note
  const [noteText, setNoteText] = useState("");

  // Stores text while importing a note
  const [importText, setImportText] = useState("");

  // Stores currently logged-in user ID
  const [userId, setUserId] = useState(null);

  // Controls Add Note modal visibility
  const [showAdd, setShowAdd] = useState(false);

  // Controls Import modal visibility
  const [showImport, setShowImport] = useState(false);

  // Controls which feed is shown (all / mine / events)
  const [feedMode, setFeedMode] = useState("all");

  // Stores all events (from browser storage)
  const [events, setEvents] = useState([]);

  // Controls Add Event modal visibility
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Stores event title input
  const [eventTitle, setEventTitle] = useState("");

  // Stores event date input
  const [eventDate, setEventDate] = useState("");

  // Runs once when page loads
  useEffect(() => {
    // Fetch notes from database
    loadNotes();

    // Load events from localStorage
    const storedEvents = localStorage.getItem("events");

    // If events exist, store them in state
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Fetches notes from Supabase database
  async function loadNotes() {
    // Get currently logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Stop if user is not logged in
    if (!user) return;

    // Save user ID for later use
    setUserId(user.id);

    // Fetch all notes sorted by newest first
    const { data } = await supabase
      .from("Notes")
      .select("*")
      .order("created_at", { ascending: false });

    // Store notes in state
    setNotes(data || []);
  }

  // Adds a new note to the database
  async function addNote() {
    // Prevent empty note submission
    if (!noteText.trim()) return;

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Stop if no user
    if (!user) return;

    // Insert note into database
    const { data, error } = await supabase
      .from("Notes")
      .insert({
        text: noteText,
        author: user.email,
        user_id: user.id,
      })
      .select()
      .single();

    // Show error if insertion fails
    if (error) {
      alert(error.message);
      return;
    }

    // Add new note to UI instantly
    setNotes([data, ...notes]);

    // Clear input field
    setNoteText("");

    // Close Add Note modal
    setShowAdd(false);
  }

  // Imports a note with custom text
  async function importNote() {
    // Prevent empty import
    if (!importText.trim()) return;

    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Stop if no user
    if (!user) return;

    // Add prefix to imported text
    const finalText = `Imported with text: ${importText}`;

    // Insert imported note
    const { data, error } = await supabase
      .from("Notes")
      .insert({
        text: finalText,
        author: user.email,
        user_id: user.id,
      })
      .select()
      .single();

    // Handle insertion error
    if (error) {
      alert(error.message);
      return;
    }

    // Update UI with imported note
    setNotes([data, ...notes]);

    // Clear import input
    setImportText("");

    // Close Import modal
    setShowImport(false);
  }

  // Deletes a note from database
  async function deleteNote(noteId) {
    // Delete note by ID
    const { error } = await supabase.from("Notes").delete().eq("id", noteId);

    // Remove note from UI if delete succeeds
    if (!error) {
      setNotes(notes.filter((note) => note.id !== noteId));
    }
  }

  // Filters notes based on selected feed mode
  const displayedNotes =
    feedMode === "mine"
      ? notes.filter((note) => note.user_id === userId)
      : notes;

  // Checks if Events view is active
  const isEventView = feedMode === "events";

  // Saves events to browser storage
  function saveEventsToStorage(updatedEvents) {
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  }

  // Adds a new event
  function addEvent() {
    // Prevent empty event submission
    if (!eventTitle || !eventDate) return;

    // Create new event object
    const newEvent = {
      id: Date.now(),
      title: eventTitle,
      event_date: eventDate,
    };

    // Add event to list
    const updatedEvents = [...events, newEvent];

    // Save events permanently
    saveEventsToStorage(updatedEvents);

    // Clear event form
    setEventTitle("");
    setEventDate("");

    // Close Add Event modal
    setShowAddEvent(false);
  }

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Get only upcoming events sorted by date
  const upcomingEvents = events
    .filter((e) => e.event_date >= today)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-4 mt-4">
            {/* LEFT SIDEBAR */}
            <div className="col-span-3 bg-white rounded-lg p-4 space-y-3">
              <h2 className="text-lg font-semibold mb-2">📌 Menu</h2>
              <SidebarItem
                icon="🏠"
                label="My Feed"
                onClick={() => setFeedMode("mine")}
              />
              <SidebarItem
                icon="🌍"
                label="All Feed"
                onClick={() => setFeedMode("all")}
              />
              <SidebarItem
                icon="📅"
                label={`Events (${events.length})`}
                onClick={() => setFeedMode("events")}
              />
              <SidebarItem icon="👥" label="Groups" />
              <SidebarItem icon="💾" label="Saved" />
              <SidebarItem
                icon="🤖"
                label="AI"
                onClick={() => router.push("/ai")}
              />
            </div>

            {/* FEED */}
            <div className="col-span-6 bg-white rounded-lg p-4 space-y-3">
              <h2 className="font-semibold">
                {isEventView ? "All Events" : "Explore"}
              </h2>

              {isEventView ? (
                events.length === 0 ? (
                  <p className="text-sm text-gray-500">No events added.</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-3">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        Event Date: {event.event_date}
                      </p>
                    </div>
                  ))
                )
              ) : (
                displayedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <div>
                      <p className="font-medium">{note.text}</p>
                      <p className="text-xs text-gray-500">
                        Posted by {note.author}
                      </p>
                    </div>

                    {note.user_id === userId && (
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* RIGHT WIDGETS */}
            <div className="col-span-3 space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-3">📅 Upcoming Events</h3>

                {upcomingEvents.length === 0 && (
                  <p className="text-sm text-gray-500">No upcoming events</p>
                )}

                {upcomingEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    day={new Date(event.event_date).getDate()}
                    month={new Date(event.event_date).toLocaleString(
                      "default",
                      { month: "short" }
                    )}
                    title={event.title}
                  />
                ))}
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-3">🔥 Trending in Campus</h3>
                <p className="text-sm text-blue-600"># ExamTips</p>
                <p className="text-sm text-blue-600"># DormLife</p>
                <p className="text-sm text-blue-600"># BookClub</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-3">👥 Suggested Groups</h3>
                <GroupItem name="Study Buddies" />
                <GroupItem name="Tech & Coding Club" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 shadow-xl">
          <button
            onClick={() => setShowAdd(true)}
            className="rounded-full bg-white px-4 py-2"
          >
            ➕ Add
          </button>
          <button
            onClick={() => setShowImport(true)}
            className="rounded-full bg-white px-4 py-2"
          >
            📂 Import
          </button>
          <button
            onClick={() => setShowAddEvent(true)}
            className="rounded-full bg-white px-4 py-2"
          >
            📅 Event
          </button>
        </div>
      </div>

      {/* ADD EVENT MODAL */}
      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="font-semibold mb-4">Add Event</h2>
            <input
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full border p-2 mb-2"
              placeholder="Event title"
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full border p-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowAddEvent(false)}>Cancel</button>
              <button
                onClick={addEvent}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NOTE MODAL */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border p-3"
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowAdd(false)}>Cancel</button>
              <button onClick={addNote}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <input
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full border p-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowImport(false)}>Cancel</button>
              <button onClick={importNote}>Import</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
