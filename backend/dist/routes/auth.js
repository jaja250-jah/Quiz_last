"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// In-memory user store for starter scaffold
const users = {};
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Missing fields' });
    if (users[email])
        return res.status(400).json({ error: 'User exists' });
    const hash = await bcrypt_1.default.hash(password, 10);
    users[email] = { email, password: hash, role: 'student' };
    res.json({ ok: true });
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users[email];
    if (!user)
        return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    res.json({ token });
});
exports.default = router;
