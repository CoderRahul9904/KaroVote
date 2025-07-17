import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import config from '../config';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    // req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
