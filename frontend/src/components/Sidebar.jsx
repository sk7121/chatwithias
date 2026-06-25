import { LogOut, Search, MessageSquare, Users, X } from "lucide-react";

export default function Sidebar({
    currentUser,
    conversations,
    users,
    selectedConversation,
    selectedUser,
    onConversationSelect,
    onUserSelect,
    onLogout,
    onClose,
    searchQuery,
    onSearchChange,
    loading,
}) {
    return (
        <div className="lg:w-96 w-full h-full bg-slate-950 border-r border-slate-800 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">IAS-ChatHub</h1>
                    <p className="text-sm text-slate-400">Connect with friends instantly.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onLogout}
                        className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 transition"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                    <button
                        onClick={() => onClose?.()}
                        className="lg:hidden p-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300"
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="border-b border-slate-800 p-5 flex items-center gap-4 bg-slate-900">
                <div className="w-14 h-14 rounded-3xl bg-slate-700 text-slate-100 flex items-center justify-center text-xl font-bold">
                    {currentUser.username[0].toUpperCase()}
                </div>

                <div>
                    <p className="text-sm text-slate-400">Signed in as</p>
                    <p className="font-semibold">{currentUser.username}</p>
                </div>
            </div>

            <div className="p-4">
                <label className="relative block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        value={searchQuery}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search chats or contacts"
                        className="w-full pl-12 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </label>
            </div>

            <div className="p-5 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 uppercase tracking-[0.2em] text-xs font-semibold">
                    <MessageSquare size={14} />
                    Recent chats
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-3">
                {conversations.length === 0 ? (
                    <div className="text-slate-500 px-4 py-3">No recent conversations yet.</div>
                ) : (
                    conversations.map((conversation) => {
                        const other = conversation.participants.find(
                            (participant) => participant._id !== currentUser._id,
                        );
                        const isActive = selectedConversation?._id === conversation._id;

                        return (
                            <button
                                key={conversation._id}
                                onClick={() => onConversationSelect(conversation)}
                                className={`w-full text-left rounded-3xl px-4 py-4 transition ${isActive ? "bg-slate-800" : "hover:bg-slate-900"}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-3xl bg-blue-600 text-white font-semibold flex items-center justify-center">
                                        {other?.username?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-medium">{other?.username || "Unknown"}</p>
                                            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Chat</span>
                                        </div>
                                        <p className="text-sm text-slate-400 truncate">{conversation.lastMessage || "Start the conversation"}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>

            <div className="p-5 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between mb-3 text-slate-400 uppercase tracking-[0.2em] text-xs font-semibold">
                    <span>Contacts</span>
                    <Users size={14} />
                </div>

                <div className="space-y-2">
                    {users.length === 0 ? (
                        <div className="text-slate-500">No contacts found.</div>
                    ) : (
                        users.map((contact) => {
                            const isSelected = selectedUser?._id === contact._id;
                            return (
                                <button
                                    key={contact._id}
                                    onClick={() => onUserSelect(contact)}
                                    className={`w-full rounded-3xl px-4 py-3 transition text-left ${isSelected ? "bg-blue-600 text-white" : "bg-slate-900 hover:bg-slate-800"}`}
                                    disabled={loading}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-3xl bg-slate-700 text-slate-100 flex items-center justify-center font-semibold">
                                            {contact.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{contact.username}</p>
                                            <p className="text-xs text-slate-400">{contact.email}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
