import Axios from 'axios';
export const mockAxiosFailure = () => {
  Axios.get = jest.fn().mockRejectedValue(new Error('error'));
};

export const mockCountriesEmpty = () => {
  Axios.get = jest.fn().mockResolvedValue([]);
};
export const mockListCountriesAxios = () => {
  Axios.get = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      data: [
        {
          name: {
            official: 'united states',
          },
          population: 1000,
          currencies: {
            USD: {
              name: 'USD',
              symbol: '$',
            },
          },
        },
        {
          name: {
            official: 'test',
          },
          population: 0,
        },
      ],
    });
  });
};

export const mockExchangeAxiosFailure = () => {
  Axios.get = jest.fn().mockResolvedValue({
    data: {
      success: false,
      error: {
        code: 105,
        type: 'base_currency_access_restricted',
      },
    },
  });
};

export const mockExchangeRate = () => {
  Axios.get = jest.fn().mockResolvedValue({
    data: {
      success: true,
      base: 'test',
      rates: {
        SEK: 10,
        USD: 1,
      },
    },
  });
};
