import User from '../models/user.model';
import bcrypt from 'bcrypt';


//login

export const loginUser = async (userDetails) => {
  const user = await User.findOne({email: userDetails.email } );
  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(userDetails.password, user.password);

  if (!passwordMatch) {
    throw new Error('Password not matched');
  }
  return user;
};

//create new user
export const userRegistration = async (body) => {
  const email = await User.findOne({email:body.email})
  if(email){
    throw new Error('user alrady have an account');
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  console.log("body :>",body)
  const data = await User.create(body)
  return data
};

