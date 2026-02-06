"use client";

export default function SidebarItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-100 transition"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
}
