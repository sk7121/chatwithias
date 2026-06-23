require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/DB");
const app = require("./app");
const { initSocket } = require("./socket/socket");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

initSocket(io);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on port ${process.env.PORT || 5000}`);
});
