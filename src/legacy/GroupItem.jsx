export default function GroupItem({ name }) {
    return (
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm">{name}</p>
        <button className="text-xs px-3 py-1 rounded bg-green-600 text-white hover:bg-green-500">
          Join
        </button>
      </div>
    );
  }
  