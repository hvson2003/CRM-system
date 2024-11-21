import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

export const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'default_secret_key',
    { expiresIn: '1h' }
  );
};


export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Không có token, quyền truy cập bị từ chối' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.userId = decoded.id;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
};

export const checkRole = (allowedRoles) => (req, res, next) => {  
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
  }
  next();
};

