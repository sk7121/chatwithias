import { Menu } from "lucide-react";

export default function ChatHeader({ user, selectedUser, isConnected, toggleSidebar }) {
    const displayName = selectedUser ? selectedUser.username : "Select a chat";
    const subtitle = selectedUser
        ? isConnected
            ? "Active now"
            : "Reconnecting..."
        : "Choose a contact to start messaging";

    return (
        <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={20} />
                </button>

                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                        {displayName[0]?.toUpperCase()}
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl">{displayName}</h2>
                        <p className="text-sm text-slate-400">{subtitle}</p>
                    </div>
                </div>
            </div>

            <div className={`rounded-3xl px-4 py-3 text-sm ${selectedUser ? "bg-slate-900 text-slate-300" : "bg-slate-900 text-slate-400"}`}>
                {selectedUser ? "Live conversation" : "Ready"}
            </div>
        </div>
    );
}