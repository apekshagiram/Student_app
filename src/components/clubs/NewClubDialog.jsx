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

import { createClub } from "@/lib/actions/clubs";

export default function NewClubDialog() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    startTransition(async () => {
      try {
        await createClub({
          name,
          description,
          category,
        });

        setName("");
        setDescription("");
        setCategory("");

        setOpen(false);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">
          + New Club
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Club</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Create a club for students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Club Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
            required
          />

          <textarea
            rows={4}
            placeholder="Club Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Arts">Arts</option>
            <option value="Academic">Academic</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Club"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}