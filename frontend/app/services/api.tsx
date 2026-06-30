import axios, { type AxiosResponse } from "axios";

export default class APIService {
  private static readonly instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    }
  });

  public static async isPrime(number: number): Promise<AxiosResponse<boolean>> {
    const url = `/api/primality_testing/?number=${number}`;
    return await this.instance.get<boolean>(url);
  }
}
