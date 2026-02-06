"use client";

import { useState, useEffect, useRef } from "react";
import { askGemini } from "./actionAi";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    const answer = await askGemini(input, history);

    setHistory((prev) => [...prev, { question: input, answer }]);

    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Chat Box */}
      <div className="w-full max-w-md h-[520px] bg-white border rounded-xl flex flex-col">
        {/* Header */}
        <div className="border-b px-4 py-3 text-sm font-medium">
          AI Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {history.length === 0 && (
            <p className="text-xs text-gray-400 text-center mt-10">
              Start typing to chat
            </p>
          )}

          {history.map((item, index) => (
            <div key={index} className="space-y-2">
              {/* User */}
              <div className="flex justify-end">
                <div className="max-w-[75%] bg-black text-white text-sm px-3 py-2 rounded-lg">
                  {item.question}
                </div>
              </div>

              {/* AI */}
              <div className="flex justify-start">
                <div className="max-w-[75%] bg-gray-100 text-sm px-3 py-2 rounded-lg">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}

          {loading && <p className="text-xs text-gray-400">typing…</p>}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t px-3 py-2 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Message"
            className="flex-1 text-sm border rounded-full px-4 py-2 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm font-medium px-3 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
