import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { createToken, revokeToken } from '../utils/tokens.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'candidate', company = '' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if (!['candidate', 'recruiter'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (role === 'recruiter' && process.env.ALLOW_RECRUITER_REGISTRATION !== 'true') {
      return res.status(403).json({ message: 'Recruiter registration is disabled' });
    }
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
      role,
      company,
    });
    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role, company: user.company };
    res.status(201).json({ token: createToken(user), user: safeUser });
  } catch {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role, company: user.company };
    res.json({ token: createToken(user), user: safeUser });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/logout', auth, (req, res) => {
  const header = req.headers.authorization || '';
  revokeToken(header.replace(/^Bearer\s+/i, ''));
  res.json({ message: 'Logged out successfully' });
});

export default router;
