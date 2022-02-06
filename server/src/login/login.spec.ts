import request from 'supertest';
import { appInstance } from '../server';
import jsonwebtoken from 'jsonwebtoken';
import { jwt } from '../utility/jwt';

describe('Login', () => {
  afterAll(jest.restoreAllMocks);
  describe('Valid input', () => {
    it('Login api should jwt x-user', async () => {
      const response = await request(appInstance.app).get('/login');
      expect(response.header).toHaveProperty('x-user');
    });

    it('Login api should create valid jwt x-user', async () => {
      const response = await request(appInstance.app).get('/login');
      const decoded = await jwt.verify(response.header['x-user']);
      expect(decoded).toHaveProperty('data');
      expect(decoded.data).toBe('user-test');
    });
  });

  describe('Invalid input', () => {
    it('should send interal server error if any exception is found', async () => {
      jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => {
        throw new Error('test');
      });
      const response = await request(appInstance.app).get('/login');
      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        error: 'Internal Server Error',
      });
    });
  });
});
