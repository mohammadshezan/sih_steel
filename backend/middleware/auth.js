const jwt = require('jsonwebtoken');

// Verify JWT token middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization token' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const payload = jwt.verify(token, secret);
    req.user = payload; // { id, role, iat, exp }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Require one of the allowed roles
function requireRole(roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient role' });
    }
    return next();
  };
}

module.exports = { verifyToken, requireRole };
