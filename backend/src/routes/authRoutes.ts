import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials as requested
  const ADMIN_EMAIL = 'info@smartgrits.com';
  const ADMIN_PASS = 'grits2026';

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-development';
    
    // Generate token valid for 24 hours
    const token = jwt.sign(
      { email, role: 'admin' },
      secret,
      { expiresIn: '24h' }
    );
    
    res.json({ token, email, success: true });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

export default router;
