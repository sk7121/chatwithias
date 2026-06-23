import { useEffect, useState } from "react";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import socket from "./socket";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    socket.disconnect();
  };

  return user?._id ? (
    <ChatPage user={user} onLogout={handleLogout} />
  ) : (
    <AuthPage onLogin={handleLogin} />
  );
}

export default App;

