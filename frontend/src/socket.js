import { io } from "socket.io-client";

const backendUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000";
const socket = io(backendUrl, {
  transports: ["websocket"],
});

export default socket;
