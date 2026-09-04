"use client";

import { Bell, CalendarDays, BookOpen, Users } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Upcoming Event",
    message: "Check your upcoming events and activities.",
    icon: CalendarDays,
  },
  {
    id: 2,
    title: "Study Reminder",
    message: "Keep your study progress up to date.",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Club Activity",
    message: "Check your joined clubs for new activities.",
    icon: Users,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Notifications
        </h1>

        <p className="text-zinc-500 mt-1">
          Stay updated with your student activities.
        </p>
      </div>

      <div className="max-w-2xl space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5 flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2c2c2e] flex items-center justify-center shrink-0">
                <Icon
                  size={18}
                  className="text-zinc-300"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  {notification.title}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}