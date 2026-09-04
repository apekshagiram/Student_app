export default function EventItem({ day, month, title }) {
    return (
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex flex-col items-center justify-center text-xs font-semibold">
          <span>{day}</span>
          <span>{month}</span>
        </div>
        <p className="text-sm font-medium">{title}</p>
      </div>
    );
  }
  