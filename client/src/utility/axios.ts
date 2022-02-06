import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "./config";

export class Axios {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static responseBody = (response: AxiosResponse): AxiosResponse<any> =>
    response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static get(url: string): Promise<any> {
    return axios
      .get(`${SERVER_URL}/${url}`, {
        withCredentials: true,
      })
      .then(this.responseBody);
  }
}
