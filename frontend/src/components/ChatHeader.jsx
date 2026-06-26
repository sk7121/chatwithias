import { Menu } from "lucide-react";

export default function ChatHeader({
    selectedUser,
    isConnected,
    toggleSidebar,
}) {
    const displayName = selectedUser
        ? selectedUser.username
        : "Select a chat";

    const subtitle = selectedUser
        ? isConnected
            ? "Active now"
            : "Reconnecting..."
        : "Choose a contact to start messaging";

    return (
        <header className="h-16 shrink-0 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={20} />
                </button>

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shrink-0">
                    {displayName[0]?.toUpperCase()}
                </div>

                <div className="min-w-0">
                    <h2 className="font-semibold text-lg truncate">
                        {displayName}
                    </h2>

                    <p className="text-xs text-slate-400 truncate">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="hidden sm:block rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300 shrink-0">
                {selectedUser ? "Live conversation" : "Ready"}
            </div>
        </header>
    );
}