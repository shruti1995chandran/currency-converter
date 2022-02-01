import axios, { AxiosResponse } from 'axios';

export class AxiosUtil {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static responseBody = (response: AxiosResponse): AxiosResponse<any> => response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static get(url: string): Promise<any> {
    return axios.get(url).then(this.responseBody);
  }
}
