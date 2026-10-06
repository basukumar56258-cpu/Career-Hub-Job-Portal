import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isTokenRevoked } from '../utils/tokens.js';

export async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' });
    const token = header.slice(7);
    if (isTokenRevoked(token)) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export const role = (...roles) => (req, res, next) => 
  roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Access denied' });
