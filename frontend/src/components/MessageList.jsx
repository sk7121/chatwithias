export default function MessageList({ messages, currentUser }) {
    if (!messages || messages.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-500">
                <div className="text-center px-6 py-10">
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
        <div className="h-full overflow-y-auto p-6 space-y-4 bg-slate-900">
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
                            className={`max-w-[75%] rounded-3xl px-5 py-3 ${isMine
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-800 text-white"
                                }`}
                        >
                            <p>{message.text}</p>

                            <div className="mt-2 text-right text-xs opacity-70">
                                {new Date(
                                    message.createdAt
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}