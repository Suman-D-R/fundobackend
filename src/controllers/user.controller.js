import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
  
  if(data) { res.status(HttpStatus.OK).json({
      code: HttpStatus.Ok,
      data: data,
      message: 'User created successfully'
    });}
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
};

export const forgetpassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetpassword(req.body);
  
  if(data) { res.status(HttpStatus.OK).json({
      code: HttpStatus.Ok,
      data: data,
      message: 'User token created successfully'
    });}
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Call the service function
    
    const data = await UserService.resetPassword(req.body);

    // Handle the response
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User password changed successfully',
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message,
    });
  }
};





