import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';

const revokedTokenIds = new Set();

export function createToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, jti: randomUUID() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}

export function isTokenRevoked(token) {
  try {
    return revokedTokenIds.has(jwt.decode(token)?.jti);
  } catch {
    return false;
  }
}

export function revokeToken(token) {
  const jti = jwt.decode(token)?.jti;
  if (jti) revokedTokenIds.add(jti);
}
