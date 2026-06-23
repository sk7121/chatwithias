export default function MessageList({ messages, currentUser }) {
    if (!messages || messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500 bg-slate-900">
                <div className="text-center px-6 py-10">
                    <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-500">No messages yet</p>
                    <p className="text-base text-slate-400">Start the conversation by selecting a chat or sending a message.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900">
            {messages.map((message) => {
                const isMine = message.sender === currentUser._id || message.sender?._id === currentUser._id;
                return (
                    <div key={message._id || message.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-5 py-3 rounded-3xl shadow-lg ${isMine ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-100"}`}>
                            <div className="text-sm leading-6 whitespace-pre-wrap">{message.text}</div>
                            <div className="mt-2 text-[11px] text-slate-500 text-right">{new Date(message.createdAt || message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}