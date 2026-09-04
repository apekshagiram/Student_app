"use client";

import { BookOpen, CalendarDays, Users } from "lucide-react";

export default function QuickStats({ stats }) {
  const cards = [
    {
      title: "Notes",
      value: stats.notesCount,
      icon: BookOpen,
    },
    {
      title: "Events",
      value: stats.eventsCount,
      icon: CalendarDays,
    },
    {
      title: "Clubs",
      value: stats.clubsJoined,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">
                {card.title}
              </span>

              <Icon
                size={18}
                className="text-zinc-400"
              />
            </div>

            <h2 className="text-3xl font-bold text-white mt-3">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}