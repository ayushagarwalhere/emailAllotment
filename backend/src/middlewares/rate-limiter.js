import { RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "../config/db.js";

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10,
  duration: 1,
  blockDuration: 0,
  keyPrefix: "general_rate_limiter",
});

const authRateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  points: 5,
  duration: 1,
  blockDuration: 1,
  keyPrefix: "auth_rate_limiter",
});

export const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiterRedis.consume(req.ip);
    next();
  } catch {
    res.status(429).json({ error: "Too Many Requests" });
  }
};

export const authRateLimiterMiddleware = async (req, res, next) => {
  if (!req.body.email) {
    res.status(400).json({ error: "Email required" });
    return;
  }
  try {
    await authRateLimiterRedis.consume(req.body.email);
    next();
  } catch {
    res.status(429).json({ error: "Too Many Requests" });
  }
};
