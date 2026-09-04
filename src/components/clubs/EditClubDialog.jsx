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

import { updateClub } from "@/lib/actions/clubs";

export default function EditClubDialog({ club }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(club.name);
  const [description, setDescription] = useState(club.description || "");
  const [category, setCategory] = useState(club.category || "");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateClub(club.id, {
          name,
          description,
          category,
        });

        setOpen(false);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-500 text-sm hover:text-blue-400">
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white">
        <DialogHeader>
          <DialogTitle>Edit Club</DialogTitle>

          <DialogDescription>
            Update your club.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          />

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          >
            <option>Technology</option>
            <option>Sports</option>
            <option>Cultural</option>
            <option>Arts</option>
            <option>Academic</option>
            <option>Music</option>
            <option>Other</option>
          </select>

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}