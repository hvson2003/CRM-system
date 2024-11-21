import User from '../models/user.model.js';
import { generateToken } from '../utils/auth.js';

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được đăng ký' });
    }

    const user = new User({ 
      email: email.toLowerCase(), 
      password, 
      role: role || 'User' 
    });
    
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      userId: user._id
    });
  } catch (err) {
    console.error('Đăng ký lỗi:', err);
    res.status(500).json({ 
      message: 'Lỗi server, vui lòng thử lại',
      error: err.message 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Email không chính xác' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác' });
    }

    const token = generateToken(user._id, user.role);    

    res.json({
      message: 'Đăng nhập thành công',
      token,
      userId: user._id,
      userRole: user.role
    });
  } catch (err) {
    console.error('Đăng nhập lỗi:', err);
    res.status(500).json({ 
      message: 'Lỗi server, vui lòng thử lại',
      error: err.message 
    });
  }
};