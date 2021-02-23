import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import AppError from '@shared/errors/AppError';

const redisClient: RedisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  reponse: Response,
  next: NextFunction,
) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('Too Many Requests', 429);
  }
}
