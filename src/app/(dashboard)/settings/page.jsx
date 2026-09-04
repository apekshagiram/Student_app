"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="text-zinc-500 mt-1">
          Manage your application preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Notifications */}
        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-medium">
                Notifications
              </h2>

              <p className="text-sm text-zinc-500 mt-1">
                Receive notifications about important updates.
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications
                  ? "bg-white"
                  : "bg-zinc-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  notifications
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Compact Mode */}
        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-medium">
                Compact Mode
              </h2>

              <p className="text-sm text-zinc-500 mt-1">
                Use a more compact layout.
              </p>
            </div>

            <button
              onClick={() => setCompactMode(!compactMode)}
              className={`w-11 h-6 rounded-full transition-colors ${
                compactMode
                  ? "bg-white"
                  : "bg-zinc-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  compactMode
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
          <h2 className="text-white font-medium">
            Account
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Manage your account from the Profile page.
          </p>

          <a
            href="/profile"
            className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300"
          >
            Go to Profile →
          </a>
        </div>
      </div>
    </div>
  );
}