"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createTimetable } from "@/lib/actions/timetable";

export default function NewTimetableDialog() {
  const [open, setOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!subject.trim() || !day || !startTime || !endTime) {
      alert("Please fill all required fields.");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be after start time.");
      return;
    }

    startTransition(async () => {
      try {
        await createTimetable({
          subject,
          teacher,
          room,
          day,
          start_time: startTime,
          end_time: endTime,
        });

        setOpen(false);

        setSubject("");
        setTeacher("");
        setRoom("");
        setDay("Monday");
        setStartTime("");
        setEndTime("");
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200">
          + Add Class
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Add a class to your weekly timetable.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <input
            type="text"
            placeholder="Teacher (optional)"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <input
            type="text"
            placeholder="Room (optional)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-1 rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full mt-1 rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Class"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}