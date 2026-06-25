import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MessageInput({
    value,
    onChange,
    onSend,
    disabled,
}) {

    return (
        <div className="shrink-0 bg-slate-950 border-t border-slate-800 p-4">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onSend();
                        }
                    }}
                    placeholder="Type a message..."
                    disabled={disabled}
                    className="flex-1 rounded-full bg-slate-900 border border-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                />

                <button
                    onClick={onSend}
                    disabled={disabled}
                    className="bg-blue-600 hover:bg-blue-500 rounded-full p-3 disabled:opacity-50"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
}