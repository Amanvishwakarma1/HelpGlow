const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'helpglow_jwt_secret_key_super_secure_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'helpglow_jwt_refresh_secret_key_2026';

/**
 * Generate short-lived Access Token (15 min)
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username || user.name, 
      email: user.email, 
      role: user.role || 'user',
      provider: user.provider || 'email'
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
};

/**
 * Generate long-lived Refresh Token (7 days)
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Verify Refresh Token
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

/**
 * Cookie options for Refresh Token HttpOnly Cookie
 */
const getRefreshTokenCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenCookieOptions,
  JWT_SECRET
};
