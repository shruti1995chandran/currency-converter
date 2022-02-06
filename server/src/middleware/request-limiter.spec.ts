import { Request } from 'express';
import { Configuration } from '../utility/config';
import { requestLimiter } from '../middleware/request-limiter';
import { Cache } from '../utility/cache';
import { CustomResponse } from '../utility/response';

describe('Request-limiter middleware', () => {
  let request: Request;
  let response: Express.CustomResponse;
  beforeEach(() => {
    Cache.delete('user-test');
  });
  afterAll(jest.restoreAllMocks);

  describe('Invalid inputs', () => {
    beforeEach(() => {
      request = <Request>{
        headers: {},
        cookies: {},
      };
      response = <Express.CustomResponse>{};
    });
    ('');
    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });
    it('should throw error if request limit exceeds the threshold', async () => {
      Configuration.REQUEST_LIMIT_MAX_COUNT = 2;
      const next = jest.fn();
      response.locals = {
        user: {
          data: 'user-test',
          exp: 123,
          iat: 123,
        },
      };
      await requestLimiter(request, response, next);
      await requestLimiter(request, response, next);
      await requestLimiter(request, response, next);
      expect(next).toHaveBeenCalledTimes(3);
      expect(next).toBeCalledWith(
        CustomResponse.requestLimitReached('Request limit exceeded!!! Please try again after few minutes')
      );
    });
  });
  describe('Valid Input', () => {
    it('should call next and setting Cache Data', async () => {
      const next = jest.fn();
      response.locals = {
        user: {
          data: 'user-test',
          exp: 123,
          iat: 123,
        },
      };
      await requestLimiter(request, response, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(Cache.get(response.locals.user.data)).toBe('1');
    });
  });
});
