import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// In-memory user store for starter scaffold
const users: Record<string, any> = {};

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (users[email]) return res.status(400).json({ error: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  users[email] = { email, password: hash, role: 'student' };
  res.json({ ok: true });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.json({ token });
});

export default router;
