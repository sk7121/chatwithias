import { SendHorizontal } from "lucide-react";
import { useRef } from "react";

export default function MessageInput({
    value,
    onChange,
    onSend,
    disabled,
}) {
    const inputRef = useRef(null);

    const handleSend = async () => {
        if (!value.trim() || disabled) return;

        await onSend();

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };

    return (
        <div className="shrink-0 border-t border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-3">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    autoComplete="off"
                    placeholder="Type a message..."
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    className="flex-1 rounded-full border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition-colors focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleSend}
                    disabled={disabled}
                    className="rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
}