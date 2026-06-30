import axios, { type AxiosResponse } from "axios";

export default class APIService {
  private static readonly instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    }
  });

  public static async isPrime(number: bigint): Promise<AxiosResponse<boolean>> {
    const url: string = `/api/primality_testing/?number=${number.toString()}`;
    return await this.instance.get<boolean>(url);
  }
}
