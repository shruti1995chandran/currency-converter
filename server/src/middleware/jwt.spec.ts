import { Request } from 'express';
import { jwtMiddleware } from '../middleware/jwt-middleware';
import { jwt } from '../utility/jwt';
import { CustomResponse } from '../utility/response';

const UN_AUTHORIZED_MESSAGE = 'User is not authorized to continue!';

describe('JWT Middleware', () => {
  let request: Request;
  let response: Express.CustomResponse;
  afterAll(jest.restoreAllMocks);

  const resetRequestResponse = (): void => {
    request = <Request>{
      headers: {},
      cookies: {},
    };
    response = <Express.CustomResponse>{};
  };

  describe('Invalid inputs', () => {
    beforeEach(() => {
      resetRequestResponse();
    });
    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });
    it('should throw error if headers or cookies is not present', async () => {
      const next = jest.fn();
      await jwtMiddleware(request, response, next);
      expect(next).toHaveBeenCalled();
      expect(next).toBeCalledWith(CustomResponse.unauthorized(UN_AUTHORIZED_MESSAGE));
    });
    it('should throw error if invalid x-user is passed in headers', async () => {
      request.headers = {
        'x-user': 'fail',
      };
      const next = jest.fn();
      await jwtMiddleware(request, response, next);
      expect(next).toHaveBeenCalled();
      expect(next).toBeCalledWith(CustomResponse.invalid('Request is invalid!'));
    });
    it('should throw error if expired x-user is passed in headers', async () => {
      request.headers = {
        'x-user':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibG9naW4tc2VjcmV0IiwiaWF0IjoxNjIzNDgxNDIwLCJleHAiOjE2MjM0ODUwMjB9.MKauMBZWwnQbQ3c85LohmqEVf4udgoMpMfgSJpDAzOU',
      };
      const next = jest.fn();
      await jwtMiddleware(request, response, next);
      expect(next).toHaveBeenCalled();
      expect(next).toBeCalledWith(CustomResponse.invalid('Request is invalid!'));
    });
  });

  describe('Valid input', () => {
    beforeEach(() => {
      resetRequestResponse();
    });
    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });
    it('should give user if valid x-user is passed in header', async () => {
      const user = jwt.sign('user-id');
      request.headers = {
        'x-user': user,
      };
      const next = jest.fn();
      await jwtMiddleware(request, response, next);
      expect(response.locals).toHaveProperty('user');
      expect(response.locals.user).toHaveProperty('data');
      expect(response.locals.user.data).toBe('user-id');
    });

    it('should give user if valid token is passed in cookies', async () => {
      const user = jwt.sign('user-id');
      request.cookies = {
        token: user,
      };
      const next = jest.fn();
      await jwtMiddleware(request, response, next);
      expect(response.locals).toHaveProperty('user');
      expect(response.locals.user).toHaveProperty('data');
      expect(response.locals.user.data).toBe('user-id');
    });
  });
});
