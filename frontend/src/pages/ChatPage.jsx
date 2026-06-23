import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import api from "../utils/api";
import socket from "../socket";

export default function ChatPage({ user, onLogout }) {
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!user?._id) return;

        socket.emit("join", user._id);

        const handleNewMessage = (data) => {
            if (data.conversationId !== selectedConversation?._id) {
                setConversations((prev) => {
                    return prev.map((conversation) => {
                        if (conversation._id === data.conversationId) {
                            return { ...conversation, lastMessage: data.message.text };
                        }
                        return conversation;
                    });
                });
                return;
            }

            setMessages((prev) => [...prev, data.message]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [user?._id, selectedConversation]);

    useEffect(() => {
        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            loadMessages(selectedConversation._id);
        }
    }, [selectedConversation]);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load users.");
        }
    };

    const fetchConversations = async () => {
        try {
            const response = await api.get("/conversations");
            setConversations(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load conversations.");
        }
    };

    const loadMessages = async (conversationId) => {
        try {
            const response = await api.get(`/messages/${conversationId}`);
            setMessages(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load messages.");
        }
    };

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);

        const other = conversation.participants.find(
            (participant) => participant._id !== user._id,
        );

        setSelectedUser(other || null);
        // close sidebar on mobile after selecting a conversation
        setSidebarOpen(false);
    };

    const handleStartConversation = async (contact) => {
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/conversations", {
                receiverId: contact._id,
            });

            const existing = conversations.find(
                (conversation) => conversation._id === response.data._id,
            );

            setSelectedConversation(response.data);
            setSelectedUser(contact);

            if (!existing) {
                setConversations((prev) => [response.data, ...prev]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Unable to open chat.");
        } finally {
            setLoading(false);
            // close sidebar on mobile after starting a new conversation
            setSidebarOpen(false);
        }
    };

    const handleSendMessage = async () => {
        if (!draft.trim() || !selectedConversation) return;

        try {
            const response = await api.post("/messages", {
                conversationId: selectedConversation._id,
                receiverId: selectedUser?._id,
                text: draft.trim(),
            });

            setMessages((prev) => [...prev, response.data]);
            setDraft("");

            setConversations((prev) =>
                prev.map((conversation) =>
                    conversation._id === selectedConversation._id
                        ? { ...conversation, lastMessage: response.data.text }
                        : conversation,
                ),
            );
        } catch (err) {
            setError(err.response?.data?.message || "Unable to send message.");
        }
    };

    const visibleUsers = users.filter((contact) =>
        contact.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const visibleConversations = conversations.filter((conversation) => {
        const other = conversation.participants.find(
            (participant) => participant._id !== user._id,
        );
        return other?.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100">
            {/* Sidebar for large screens or overlay on mobile when open */}
            <div className={`${sidebarOpen ? "fixed inset-0 z-50" : "hidden"} lg:block`}>
                {sidebarOpen && (
                    <div className="absolute inset-0 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                <div className="relative h-full">
                    <div className="lg:relative lg:block lg:w-96 w-80 h-full">
                        <Sidebar
                            currentUser={user}
                            conversations={visibleConversations}
                            users={visibleUsers}
                            selectedConversation={selectedConversation}
                            selectedUser={selectedUser}
                            onConversationSelect={handleSelectConversation}
                            onUserSelect={handleStartConversation}
                            onLogout={onLogout}
                            onClose={() => setSidebarOpen(false)}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col bg-slate-900">
                <ChatHeader user={user} selectedUser={selectedUser} isConnected={isConnected} toggleSidebar={() => setSidebarOpen((s) => !s)} />

                {error ? (
                    <div className="p-6 text-red-300">{error}</div>
                ) : null}

                <MessageList messages={messages} currentUser={user} />

                <MessageInput
                    value={draft}
                    onChange={setDraft}
                    onSend={handleSendMessage}
                    disabled={!selectedConversation || loading}
                />
            </div>
        </div>
    );
}
