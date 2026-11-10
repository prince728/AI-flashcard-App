const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

const LIMIT = 10;
const WINDOW_SEC = 3600;

const aiRateLimitMiddleware = async (req, res, next) => {
  const key = `ratelimit:generate:${req.user.id}`;
  try {
    const [[, count]] = await redis
      .multi()
      .incr(key)
      .expire(key, WINDOW_SEC, "NX")
      .exec();

    res.set("X-RateLimit-Limit", LIMIT);
    res.set("X-RateLimit-Remaining", Math.max(0, LIMIT - count));

    if (count > LIMIT) {
      const ttl = await redis.ttl(key);
      res.set("Retry-After", ttl);
      return res.status(429).json({ message: "Generation limit reached. Try again later." });
    }
    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next();
  }
};

module.exports = aiRateLimitMiddleware;