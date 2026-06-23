const dns = require("dns").promises;
const net = require("net");

const testMongoDB = async () => {
  console.log("\n=== MongoDB Connection Diagnostics ===\n");

  const mongoHost = "cluster0.y2hs9ia.mongodb.net";
  const mongoPort = 27017;

  // Test 1: DNS Resolution
  console.log("Test 1: DNS Resolution");
  console.log(`Resolving ${mongoHost}...`);
  try {
    const addresses = await dns.resolve4(mongoHost);
    console.log("✅ DNS resolved successfully");
    console.log("IP Addresses:", addresses.join(", "));
  } catch (err) {
    console.log("❌ DNS Resolution Failed");
    console.log("Error:", err.message);
    console.log("This means: Your network cannot reach MongoDB Atlas servers");
    console.log("Solution: Check if your IP is whitelisted in MongoDB Atlas");
  }

  // Test 2: TCP Connection
  console.log("\n\nTest 2: TCP Connection to MongoDB Port");
  console.log(`Attempting to connect to ${mongoHost}:${mongoPort}...`);

  return new Promise((resolve) => {
    const socket = net.createConnection(mongoPort, mongoHost);

    socket.on("connect", () => {
      console.log("✅ TCP connection successful");
      socket.destroy();
      resolve();
    });

    socket.on("error", (err) => {
      console.log("❌ TCP Connection Failed");
      console.log("Error:", err.message);
      console.log("Error Code:", err.code);
      if (err.code === "ECONNREFUSED") {
        console.log("\nThis typically means:");
        console.log("- Your IP is NOT whitelisted in MongoDB Atlas");
        console.log("- Firewall is blocking the connection");
        console.log("- Network connectivity issue");
      }
      resolve();
    });

    socket.setTimeout(5000);
  });
};

testMongoDB().then(() => {
  console.log("\n\n=== Next Steps ===");
  console.log("1. Go to MongoDB Atlas: https://cloud.mongodb.com/");
  console.log("2. Select your cluster (Cluster0)");
  console.log("3. Click 'Network Access' in left sidebar");
  console.log("4. Click 'Add IP Address'");
  console.log("5. Add your current IP or use 0.0.0.0/0 (for development)");
  console.log(
    "6. Save and wait for the change to propagate (may take a few minutes)",
  );
  console.log("7. Restart the backend server\n");
});
