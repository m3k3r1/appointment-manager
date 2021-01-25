import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from 'src/errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;
    request.user = {
      id: decoded.sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
