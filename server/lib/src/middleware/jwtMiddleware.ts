import { CustomResponse } from '../utility/response';
import { jwt } from '../utility/jwt';
import { ERROR_CASE } from '../utility/customMessage';
import { Request, NextFunction } from 'express';

export const jwtMiddleware = async (req: Request, res: Express.CustomResponse, next: NextFunction): Promise<void> => {
  try {
    // GUIDE : JWT authentication initiated for validation and to save user information
    const token = req.headers['x-user'] || req.cookies.token;
    if (!token) {
      return next(CustomResponse.unauthorized(ERROR_CASE.UNAUTHORIZED_USER));
    }
    const decoded = await jwt.verify(token);
    res.locals = {
      userInfo: decoded,
    };
    return next();
  } catch (err) {
    return next(CustomResponse.invalid(ERROR_CASE.INVALID_REQUEST));
  }
};
