import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//login

export const loginUser = async (userDetails) => {
  const data = await User.findOne({email: userDetails.email } );
  if (!data) {
    throw new Error('User not found');
  }

  if (userDetails.email === data.email && userDetails.password !== data.password) {
    throw new Error('Password not matched');
  }

  if (userDetails.email === data.email && userDetails.password === data.password) {
    return data;
  }
  return null
};

//create new user
export const userRegistration = async (body) => {
  const email = await User.findOne({email:body.email})
  const data = await User.create(body)
  if(email){
    throw new Error('user alrady have an account');
  }
  return data
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (email) => {
  const data = await User.findOne({email:email});
  if(!data){
    throw new Error('user not found')
  }
  return data;
};
