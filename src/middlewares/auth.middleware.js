import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const userAuth = async (req, res, next) => {
  try {
    let bearerTokenArray = req.header('Authorization');
    if (!bearerTokenArray)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

    bearerTokenArray = bearerTokenArray.split(' ');
    var bearerToken;
    bearerTokenArray.length > 1
      ? (bearerToken = bearerTokenArray[1])
      : (bearerToken = bearerTokenArray[0]);
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.user_id = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

export const userForgetAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const token = bearerToken.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_KEY_FORGET);
    console.log(user);
    req.body._id = user.userId;
    next();
  } catch (error) {
    next(error);
  }
};
