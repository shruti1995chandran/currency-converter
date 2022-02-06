import { CustomResponse } from '../utility/response';
import { jwt } from '../utility/jwt';
import { ERROR_CASE } from '../utility/custom-message';
import { Request, NextFunction } from 'express';

export const jwtMiddleware = async (req: Request, res: Express.CustomResponse, next: NextFunction): Promise<void> => {
  try {
    // NOTE : JWT authentication initiated for validation and to save user information
    const token = req.headers['x-user'] || req.cookies.token;
    if (!token) {
      return next(CustomResponse.unauthorized(ERROR_CASE.UNAUTHORIZED_USER));
    }

    const decoded = await jwt.verify(token);
    // NOTE- This will set the user information to be used within all the middlewares
    res.locals = {
      user: decoded,
    };
    return next();
  } catch (err) {
    return next(CustomResponse.invalid(ERROR_CASE.INVALID_REQUEST));
  }
};
