import { useEffect, useRef } from "react";

export default function MessageList({ messages, currentUser }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages]);

    if (!messages || messages.length === 0) {
        return (
            <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">
                <div className="px-6 py-10 text-center">
                    <p className="mb-3 text-sm uppercase tracking-[0.2em]">
                        No messages yet
                    </p>

                    <p className="text-base text-slate-400">
                        Start the conversation by selecting a chat or sending a
                        message.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 px-4 py-6 md:px-6">
            <div className="space-y-4 pb-6">
                {messages.map((message) => {
                    const isMine =
                        message.sender === currentUser._id ||
                        message.sender?._id === currentUser._id;

                    return (
                        <div
                            key={message._id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-3xl px-5 py-3 shadow-sm transition-all ${message.pending
                                        ? "bg-blue-500/70 text-white"
                                        : isMine
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-800 text-white"
                                    }`}
                            >
                                <p className="break-words whitespace-pre-wrap">
                                    {message.text}
                                </p>

                                <div className="mt-2 flex items-center justify-end gap-2 text-xs opacity-75">
                                    {message.pending ? (
                                        <>
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>
        </div>
    );
}