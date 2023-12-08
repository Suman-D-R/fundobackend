import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userUtils from '../utils/user.util';


//login

export const loginUser = async (userDetails) => {
  const user = await User.findOne({ email: userDetails.email });
  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(
    userDetails.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error('Password not matched');
  }
  var token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET_KEY
  );

  return token;
};

//create new user
export const userRegistration = async (body) => {
  const email = await User.findOne({ email: body.email });
  if (email) {
    throw new Error('user alrady have an account');
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  const data = await User.create(body);
  return data;
};

//forget password
export const forgetpassword = async (body) => {
  try {
    const { email } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY_FORGET, { expiresIn: '1h' });

    return userUtils.sendEmail(token,email);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//reset password
export const resetPassword = async ( password) => {
  try {
    // Verify the token
    let token = req.header('Authorization');
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_FORGET);

    // Find the user by ID
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password reset successfully' };
  } catch (error) {
    throw new Error('Internal server error: ' + error.message);
  }
};