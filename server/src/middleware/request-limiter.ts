import { Request, NextFunction } from 'express';
import { CustomResponse } from '../utility/response';
import { Cache } from '../utility/cache';
import { Configuration } from '../utility/config';

export const requestLimiter = (req: Request, res: Express.CustomResponse, next: NextFunction) => {
  const { user } = res.locals;
  if (!checkRequestExceeded(user)) {
    return next(CustomResponse.requestLimitReached('Request limit exceeded!!! Please try again after few minutes'));
  }
  return next();
};

const checkRequestExceeded = ({ data }: JWTUtility.JWTDecoded): boolean => {
  const cachedUser = Cache.get(data);
  if (cachedUser) {
    const count = +cachedUser + 1;
    Cache.put(data, `${count}`, +Configuration.REQUEST_LIMIT_TIMER);
    return count < +Configuration.REQUEST_LIMIT_MAX_COUNT;
  } else {
    // NOTE- Currently we will only store count for getting the number of request used by that user
    // We can improve this rate limiter by having an object to store the IP as well and use userId and IP in conjuction
    Cache.put(data, '1', +Configuration.REQUEST_LIMIT_TIMER);
    return true;
  }
};
