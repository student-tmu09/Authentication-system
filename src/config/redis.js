const Redis = require("ioredis");

// 1. Redis Instance Create Karein
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// 2. Global Event Listeners
redis.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redis.on("error", (err) => {
  console.log("Redis Connection Error:", err.message);
});

// 3. Export both redis client and connection checker
module.exports = redis