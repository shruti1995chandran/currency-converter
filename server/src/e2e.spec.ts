import request from 'supertest';
import { appInstance } from '../src/server';
import { mockListCountriesAxios } from '../src/axios.mocks';

describe('Login', () => {
  const gql = `query listCountries{
    listCountries{
          name
          population
          currencies{
            name
            symbol
            shortName
          }
        }
      }`;
  let token: string;
  beforeAll(async () => {
    const { header } = await request(appInstance.app).get('/login');
    token = header['x-user'];
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('Authenticated user', () => {
    beforeEach(() => {
      mockListCountriesAxios();
    });
    afterEach(jest.restoreAllMocks);
    it('should return countries', async () => {
      const { status, body } = await request(appInstance.app)
        .post('/graphql')
        .send({
          query: gql,
        })
        .set('Accept', 'application/json')
        .set('x-user', token);
      expect(status).toBe(200);
      expect(body).toMatchObject({
        data: {
          listCountries: [
            {
              name: 'united states',
              population: 1000,
              currencies: [{ shortName: 'USD', name: 'USD', symbol: '$' }],
            },
            {
              name: 'test',
              population: 0,
              currencies: [],
            },
          ],
        },
      });
    });
  });

  describe('UnAuthenticated user', () => {
    it('should send interal server error if any exception is found', async () => {
      const { status, body } = await request(appInstance.app)
        .post('/graphql')
        .send({
          query: gql,
        })
        .set('Accept', 'application/json');
      expect(status).toBe(401);
      expect(body).toMatchObject({
        error: 'User is not authorized to continue!',
      });
    });
  });
});
