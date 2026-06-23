import { SendHorizontal } from "lucide-react";

export default function MessageInput({ value, onChange, onSend, disabled }) {
    return (
        <div className="bg-slate-950 border-t border-slate-800 p-5">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            onSend();
                        }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl px-5 py-3 text-slate-100 outline-none focus:border-blue-500"
                    disabled={disabled}
                />

                <button
                    type="button"
                    onClick={onSend}
                    disabled={disabled}
                    className="rounded-3xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
}