import jwt from 'jsonwebtoken';
import { generateTokens, setAccessTokenCookie } from '../controllers/auth';

// Configuration - store these in environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }
    try {
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      // Storing user info in request object
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        userRole: decoded.userRole
      };

      return next();

    } catch (accessError) {
      if (accessError.name === 'TokenExpiredError' && refreshToken) {
        try {
          // Verify refresh token
          const refreshDecoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
          
          // Generate new access token
          const {accessToken} = generateTokens({
            userId: refreshDecoded.userId,
            email: refreshDecoded.email,
            userRole: refreshDecoded.userRole
          });

          // Set new access token in cookie
          setAccessTokenCookie(res, accessToken);

          req.user = {
            userId: refreshDecoded.userId,
            email: refreshDecoded.email,
            userRole: refreshDecoded.userRole
          };

          return next();

        } catch (refreshError) {
          return res.status(401).json({ 
            success: false,
            message: 'Session expired. Please login again.',
            error: 'REFRESH_TOKEN_INVALID'
          });
        }
      } else {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid access token',
          error: 'ACCESS_TOKEN_INVALID'
        });
      }
    }

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Authentication failed',
      error: error.message 
    });
  }
};


