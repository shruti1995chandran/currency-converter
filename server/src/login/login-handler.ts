import { Request, Response, NextFunction } from 'express';
import { jwt } from '../utility/jwt';
import { CustomResponse } from '../utility/response';
import { Logger } from '../utility/logger';

export class LoginHandler {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // NOTE single user handling and currently not handling any DB Users for this assessment
      const loginSecret = jwt.sign('user-test');
      res.setHeader('x-user', loginSecret);
      res.cookie('token', loginSecret, { httpOnly: true });
      res.cookie('access_token', true);
      return next(CustomResponse.success({}));
    } catch (err) {
      Logger.error('Login controller exception', err);
      next(CustomResponse.internalServerError());
    }
  }
}
